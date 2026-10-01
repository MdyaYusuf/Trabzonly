using Microsoft.AspNetCore.Http;

namespace Api.Features.Players;

// Responses
public sealed record PlayerSeasonStatsDto(
  int Appearances,
  int MinutesPlayed,
  int Goals,
  int Assists,
  int CleanSheets);

public sealed record PlayerResponseDto(
  Guid Id,
  string Name,
  string Nationality,
  DateTime DateOfBirth,
  int Age,
  int? Height,
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
  bool IsDomestic,
  bool IsCaptain,
  int PositionId,
  string PositionName,
  string PositionAbbreviation = "",
  int CommentCount = 0,
  DateTime CreatedDate = default,
  DateTime? UpdatedDate = null,
  PlayerSeasonStatsDto? CurrentSeasonStats = null,
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

public sealed record PlayerRosterOverviewDto(
  decimal TotalMarketValue,
  int ActivePlayerCount,
  DateTime? LastUpdated,
  string? CurrentSeasonName);

// Requests
public sealed record CreatePlayerRequest(
  string Name,
  string Nationality,
  DateTime DateOfBirth,
  int? Height,
  string PreferredFoot,
  decimal? MarketValue,
  decimal? Wage,
  string CurrentTeam,
  string? Description,
  int? ShirtNumber,
  int PositionId,
  bool IsDomestic,
  bool IsCaptain,
  IFormFile? ImageFile);

public sealed record UpdatePlayerRequest(
  Guid Id,
  string Name,
  string Nationality,
  DateTime DateOfBirth,
  int? Height,
  string PreferredFoot,
  decimal? MarketValue,
  decimal? Wage,
  string CurrentTeam,
  string? Description,
  int? ShirtNumber,
  int PositionId,
  bool IsDomestic,
  bool IsCaptain,
  IFormFile? ImageFile,
  bool IsActive);

public sealed record RatePlayerRequest(decimal Score);

public sealed record PlayerListQueryRequest(
  string? Search = null,
  string? PositionGroup = null,
  bool? IsDomestic = null,
  string? Sort = null,
  int PageNumber = 1,
  int PageSize = 12);
