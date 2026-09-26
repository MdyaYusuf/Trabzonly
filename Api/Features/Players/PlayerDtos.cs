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
  int? ShirtNumber,
  decimal AverageRating,
  int RatingCount,
  bool IsActive,
  Guid PositionId,
  string PositionName,
  decimal? CurrentUserScore = null);

public sealed record CreatedPlayerResponseDto(
  Guid Id,
  string Name,
  string? ImageUrl);

public sealed record PlayerPreviewDto(
  Guid Id,
  string Name,
  string Nationality,
  int Age,
  decimal? MarketValue,
  string CurrentTeam,
  string? ImageUrl,
  int? ShirtNumber,
  decimal AverageRating,
  int RatingCount,
  string PositionName);

public sealed record PlayerRatingResponseDto(
  Guid PlayerId,
  decimal Score,
  decimal AverageRating,
  int RatingCount);

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
  int? ShirtNumber,
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
  int? ShirtNumber,
  Guid PositionId,
  IFormFile? ImageFile,
  bool IsActive);

public sealed record RatePlayerRequest(decimal Score);
