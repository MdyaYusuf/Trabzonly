using Api.Features.Users;

namespace Api.Features.Authentication;

// Responses
public record TokenResponseDto(
  string AccessToken,
  DateTime Expiration,
  string RefreshToken,
  UserResponseDto User);

// Requests
public sealed record LoginRequest(string Username, string Password);
public sealed record RegisterUserRequest(string Username, string Password);