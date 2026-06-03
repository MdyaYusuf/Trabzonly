using Api.Core.Controllers;
using Api.Core.Security;
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

    if (!result.Success || result.Data == null)
    {
      return CreateActionResult(result);
    }

    SetTokensAsCookies(result.Data);

    return Ok(new
    {
      result.Success,
      result.StatusCode,
      result.Message,
      Data = result.Data.User
    });
  }

  [HttpPost("register")]
  public async Task<IActionResult> Register([FromBody] RegisterUserRequest request, CancellationToken cancellationToken)
  {
    var result = await _authService.RegisterAsync(request, cancellationToken);

    return CreateActionResult(result);
  }

  [HttpPost("refresh-token")]
  public async Task<IActionResult> RefreshToken(CancellationToken cancellationToken)
  {
    var refreshToken = Request.Cookies["refreshToken"];

    if (string.IsNullOrEmpty(refreshToken))
    {
      return Unauthorized(new { Message = "Oturum bulunamadı veya süresi dolmuş." });
    }

    var result = await _authService.RefreshTokenAsync(refreshToken, cancellationToken);

    if (!result.Success || result.Data == null)
    {
      return CreateActionResult(result);
    }

    SetTokensAsCookies(result.Data);

    return Ok(new
    {
      result.Success,
      result.StatusCode,
      result.Message,
      Data = result.Data.User
    });
  }

  [HttpPost("revoke-refresh-token")]
  public async Task<IActionResult> RevokeRefreshToken(CancellationToken cancellationToken)
  {
    var refreshToken = Request.Cookies["refreshToken"];

    if (!string.IsNullOrEmpty(refreshToken))
    {
      await _authService.RevokeRefreshTokenAsync(refreshToken, cancellationToken);
    }

    Response.Cookies.Delete("accessToken");
    Response.Cookies.Delete("refreshToken");

    return Ok(new
    {
      Success = true,
      StatusCode = 200,
      Message = "Başarıyla çıkış yapıldı."
    });
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