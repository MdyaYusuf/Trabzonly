using Api.Core.Controllers;
using Api.Core.Responses;
using Api.Core.Security;
using Api.Features.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Api.Features.Authentication;

[AllowAnonymous]
[ApiController]
[Route("api/[controller]")]
public class AuthenticationController(
  IAuthenticationService _authService,
  IOptions<TokenOptions> _tokenOptions) : CustomBaseController
{
  private readonly TokenOptions _options = _tokenOptions.Value;

  [HttpPost("login")]
  public async Task<IActionResult> Login([FromBody] LoginRequest request, CancellationToken cancellationToken)
  {
    var result = await _authService.LoginAsync(request, cancellationToken);

    return CreateAuthActionResult(result);
  }

  [HttpPost("register")]
  public async Task<IActionResult> Register([FromBody] RegisterUserRequest request, CancellationToken cancellationToken)
  {
    var result = await _authService.RegisterAsync(request, cancellationToken);

    return CreateActionResult(result);
  }

  [HttpPost("refresh-token")]
  public async Task<IActionResult> RefreshToken(
    [FromBody] RefreshTokenRequest? request,
    CancellationToken cancellationToken)
  {
    string? refreshToken = ResolveRefreshToken(request);

    if (string.IsNullOrEmpty(refreshToken))
    {
      return CreateActionResult(new ReturnModel<UserResponseDto>
      {
        Success = false,
        StatusCode = 401,
        Message = "Oturum bulunamadı veya süresi dolmuş."
      });
    }

    var result = await _authService.RefreshTokenAsync(refreshToken, cancellationToken);

    return CreateAuthActionResult(result);
  }

  [HttpPost("revoke-refresh-token")]
  public async Task<IActionResult> RevokeRefreshToken(
    [FromBody] RefreshTokenRequest? request,
    CancellationToken cancellationToken)
  {
    string? refreshToken = ResolveRefreshToken(request);

    if (!string.IsNullOrEmpty(refreshToken))
    {
      await _authService.RevokeRefreshTokenAsync(refreshToken, cancellationToken);
    }

    if (!ClientPlatform.IsMobile(Request))
    {
      Response.Cookies.Delete("accessToken");
      Response.Cookies.Delete("refreshToken");
    }

    return CreateActionResult(new ReturnModel<NoData>
    {
      Success = true,
      StatusCode = 200,
      Message = "Başarıyla çıkış yapıldı."
    });
  }

  private IActionResult CreateAuthActionResult(ReturnModel<TokenResponseDto> result)
  {
    if (!result.Success || result.Data == null)
    {
      return CreateActionResult(result);
    }

    if (ClientPlatform.IsMobile(Request))
    {
      return CreateActionResult(result);
    }

    SetTokensAsCookies(result.Data);

    return CreateActionResult(new ReturnModel<UserResponseDto>
    {
      Success = result.Success,
      StatusCode = result.StatusCode,
      Message = result.Message,
      Data = result.Data.User,
      Errors = result.Errors
    });
  }

  private string? ResolveRefreshToken(RefreshTokenRequest? request)
  {
    if (ClientPlatform.IsMobile(Request))
    {
      return request?.RefreshToken;
    }

    return Request.Cookies["refreshToken"];
  }

  private void SetTokensAsCookies(TokenResponseDto tokens)
  {
    var accessOptions = new CookieOptions
    {
      HttpOnly = true,
      Secure = true,
      SameSite = SameSiteMode.Strict,
      Expires = tokens.Expiration
    };
    Response.Cookies.Append("accessToken", tokens.AccessToken, accessOptions);

    var refreshOptions = new CookieOptions
    {
      HttpOnly = true,
      Secure = true,
      SameSite = SameSiteMode.Strict,
      Expires = DateTime.Now.AddDays(_options.RefreshTokenExpiration)
    };
    Response.Cookies.Append("refreshToken", tokens.RefreshToken, refreshOptions);
  }
}
