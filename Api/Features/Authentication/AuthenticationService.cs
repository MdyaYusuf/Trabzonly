using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Api.Core.Email;
using Api.Core.Repositories;
using Api.Core.Responses;
using Api.Core.Security;
using Api.Features.Users;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Api.Features.Authentication;

public class AuthenticationService(
  IUserRepository _userRepository,
  UserBusinessRules _userBusinessRules,
  AuthenticationBusinessRules _authBusinessRules,
  UserMapper _mapper,
  IUnitOfWork _unitOfWork,
  IEmailSender _emailSender,
  IValidator<RegisterUserRequest> _registerValidator,
  IValidator<LoginRequest> _loginValidator,
  IValidator<ForgotPasswordRequest> _forgotPasswordValidator,
  IValidator<ResetPasswordRequest> _resetPasswordValidator,
  IOptions<TokenOptions> _tokenOptions,
  IOptions<EmailOptions> _emailOptions) : IAuthenticationService
{
  private readonly TokenOptions _options = _tokenOptions.Value;
  private readonly EmailOptions _emailSettings = _emailOptions.Value;

  public async Task<ReturnModel<TokenResponseDto>> LoginAsync(LoginRequest request, CancellationToken cancellationToken)
  {
    var validationResult = await _loginValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    string email = NormalizeEmail(request.Email);

    User? user = await _userRepository.GetAsync(
      predicate: u => u.Email == email,
      include: query => query.Include(u => u.Role),
      cancellationToken: cancellationToken);

    _authBusinessRules.UserCredentialsMustMatch(user, request.Password);

    string rawRefreshToken = GenerateSecureToken();
    user!.RefreshToken = HashingHelper.HashRefreshToken(rawRefreshToken);
    user.RefreshTokenExpiration = DateTime.UtcNow.AddDays(_options.RefreshTokenExpiration);

    _userRepository.Update(user);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    TokenResponseDto tokenResponse = CreateToken(user!, rawRefreshToken);

    return new ReturnModel<TokenResponseDto>()
    {
      Data = tokenResponse,
      Success = true,
      StatusCode = 200,
      Message = "Giriş başarılı."
    };
  }

  public async Task<ReturnModel<CreatedUserResponseDto>> RegisterAsync(
    RegisterUserRequest request,
    CancellationToken cancellationToken = default)
  {
    var validationResult = await _registerValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    string email = NormalizeEmail(request.Email);

    await _userBusinessRules.EmailMustBeUniqueAsync(email, cancellationToken: cancellationToken);
    _userBusinessRules.UsernameCannotBeRestrictedWord(request.Username);
    await _userBusinessRules.UsernameMustBeUniqueAsync(request.Username, cancellationToken: cancellationToken);

    User createdUser = _mapper.CreateToEntity(request);
    createdUser.Email = email;
    createdUser.RoleId = 2;

    HashingHelper.CreatePasswordHash(request.Password, out string hash, out string key);
    createdUser.PasswordHash = hash;
    createdUser.PasswordKey = key;

    await _userRepository.AddAsync(createdUser, cancellationToken);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    CreatedUserResponseDto response = _mapper.EntityToCreatedResponseDto(createdUser);

    return new ReturnModel<CreatedUserResponseDto>()
    {
      Success = true,
      Message = "Kaydınız başarıyla tamamlandı.",
      Data = response,
      StatusCode = 201
    };
  }

  public async Task<ReturnModel<TokenResponseDto>> RefreshTokenAsync(string refreshToken, CancellationToken cancellationToken)
  {
    string hashedToken = HashingHelper.HashRefreshToken(refreshToken);

    User? user = await _userRepository.GetAsync(
      predicate: u => u.RefreshToken == hashedToken,
      include: query => query.Include(u => u.Role));

    _authBusinessRules.RefreshTokenMustBeValid(user);

    string currentRefreshToken = GenerateSecureToken();
    user!.RefreshToken = HashingHelper.HashRefreshToken(currentRefreshToken);
    user.RefreshTokenExpiration = DateTime.UtcNow.AddDays(_options.RefreshTokenExpiration);

    _userRepository.Update(user);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    TokenResponseDto tokenResponse = CreateToken(user!, currentRefreshToken);

    return new ReturnModel<TokenResponseDto>()
    {
      Data = tokenResponse,
      Success = true,
      StatusCode = 200,
      Message = "Oturum tazelendi."
    };
  }

  public async Task<ReturnModel<NoData>> RevokeRefreshTokenAsync(string refreshToken, CancellationToken cancellationToken)
  {
    string hashedToken = HashingHelper.HashRefreshToken(refreshToken);
    User? user = await _userRepository.GetAsync(u => u.RefreshToken == hashedToken);
    _authBusinessRules.RefreshTokenUserMustExist(user);

    user!.RefreshToken = null;
    user.RefreshTokenExpiration = null;

    _userRepository.Update(user);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      StatusCode = 200,
      Message = "Oturum başarıyla sonlandırıldı."
    };
  }

  public async Task<ReturnModel<NoData>> ForgotPasswordAsync(
    ForgotPasswordRequest request,
    CancellationToken cancellationToken = default)
  {
    var validationResult = await _forgotPasswordValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    string email = NormalizeEmail(request.Email);

    User? user = await _userRepository.GetAsync(
      predicate: u => u.Email == email,
      enableTracking: true,
      cancellationToken: cancellationToken);

    if (user != null && user.IsActive)
    {
      string rawToken = GenerateSecureToken();
      user.PasswordResetToken = HashingHelper.HashRefreshToken(rawToken);
      user.PasswordResetTokenExpiration = DateTime.UtcNow.AddHours(1);

      _userRepository.Update(user);
      await _unitOfWork.SaveChangesAsync(cancellationToken);

      string resetUrl =
        $"{_emailSettings.FrontendBaseUrl.TrimEnd('/')}/sifre-sifirla?email={Uri.EscapeDataString(email)}&token={Uri.EscapeDataString(rawToken)}";

      string htmlBody =
        $"""
         <p>Merhaba {user.Username},</p>
         <p>Trabzonly hesabın için şifre sıfırlama talebi aldık.</p>
         <p><a href="{resetUrl}">Şifreni sıfırlamak için buraya tıkla</a></p>
         <p>Bu bağlantı 1 saat geçerlidir. Talebi sen oluşturmadıysan bu e-postayı yok sayabilirsin.</p>
         """;

      await _emailSender.SendAsync(
        email,
        "Trabzonly — Şifre Sıfırlama",
        htmlBody,
        cancellationToken);
    }

    return new ReturnModel<NoData>()
    {
      Success = true,
      StatusCode = 200,
      Message = "Eğer bu e-posta ile kayıtlı bir hesap varsa, şifre sıfırlama bağlantısı gönderildi."
    };
  }

  public async Task<ReturnModel<NoData>> ResetPasswordAsync(
    ResetPasswordRequest request,
    CancellationToken cancellationToken = default)
  {
    var validationResult = await _resetPasswordValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    string email = NormalizeEmail(request.Email);

    User? user = await _userRepository.GetAsync(
      predicate: u => u.Email == email,
      enableTracking: true,
      cancellationToken: cancellationToken);

    _userBusinessRules.PasswordResetTokenMustBeValid(user, request.Token);

    HashingHelper.CreatePasswordHash(request.NewPassword, out string hash, out string key);
    user!.PasswordHash = hash;
    user.PasswordKey = key;
    user.PasswordResetToken = null;
    user.PasswordResetTokenExpiration = null;
    user.RefreshToken = null;
    user.RefreshTokenExpiration = null;

    _userRepository.Update(user);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      StatusCode = 200,
      Message = "Şifreniz başarıyla güncellendi. Yeni şifrenizle giriş yapabilirsiniz."
    };
  }

  private static string NormalizeEmail(string email)
  {
    return email.Trim().ToLowerInvariant();
  }

  private static string GenerateSecureToken()
  {
    return Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));
  }

  private TokenResponseDto CreateToken(User user, string refreshToken)
  {
    List<Claim> claims = [
      new(ClaimTypes.NameIdentifier, user.Id.ToString()),
      new(ClaimTypes.Email, user.Email),
      new(ClaimTypes.Name, user.Username),
      new(ClaimTypes.Role, user.Role.Name)
    ];

    SymmetricSecurityKey key = new(Encoding.UTF8.GetBytes(_options.SecurityKey));
    SigningCredentials creds = new(key, SecurityAlgorithms.HmacSha512Signature);
    DateTime expiration = DateTime.UtcNow.AddMinutes(_options.AccessTokenExpiration);

    JwtSecurityToken token = new(
      issuer: _options.Issuer,
      audience: _options.Audience,
      claims: claims,
      expires: expiration,
      signingCredentials: creds
    );

    string accessToken = new JwtSecurityTokenHandler().WriteToken(token);
    UserResponseDto userDto = _mapper.EntityToResponseDto(user);

    return new TokenResponseDto(
      accessToken,
      expiration,
      refreshToken,
      userDto);
  }
}
