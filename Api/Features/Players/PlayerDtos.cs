using Microsoft.AspNetCore.Http;

namespace Api.Features.Players;

// Responses
public sealed record PlayerResponseDto(
  Guid Id,
  string Name,
  string Nationality,
  DateTime DateOfBirth,
  int Age,
  int? Height,
  int? Weight,
  string PreferredFoot,
  decimal? MarketValue,
  decimal? Wage,
  string CurrentTeam,
  string? Description,
  string? ImageUrl,
  bool IsActive,
  Guid PositionId,
  string PositionName);

// Requests
public sealed record CreatePlayerRequest(
  string Name,
  string Nationality,
  DateTime DateOfBirth,
  int? Height,
  int? Weight,
  string PreferredFoot,
  decimal? MarketValue,
  decimal? Wage,
  string CurrentTeam,
  string? Description,
  Guid PositionId,
  IFormFile? ImageFile);

public sealed record UpdatePlayerRequest(
  Guid Id,
  string Name,
  string Nationality,
  DateTime DateOfBirth,
  int? Height,
  int? Weight,
  string PreferredFoot,
  decimal? MarketValue,
  decimal? Wage,
  string CurrentTeam,
  string? Description,
  Guid PositionId,
  IFormFile? ImageFile,
  bool IsActive);