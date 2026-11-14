namespace Api.Features.Squads;

// Responses
public sealed record SquadSlotResponseDto(
  Guid Id,
  string SlotKey,
  int SortOrder,
  int PlayerId,
  string PlayerName,
  string? PlayerImageUrl,
  string PositionAbbreviation,
  int? PlayerShirtNumber,
  int Age,
  decimal? MarketValue,
  int? PositionRoleId = null,
  string? PositionRoleName = null,
  string? PositionRoleDescription = null);

public sealed record SquadResponseDto(
  Guid Id,
  string Title,
  string Formation,
  string Notes,
  string AttackStyle,
  string DefenseLine,
  string Tempo,
  int CaptainPlayerId,
  int CornerTakerPlayerId,
  int FreeKickTakerPlayerId,
  Guid UserId,
  string AuthorUsername,
  string? AuthorDisplayTag,
  string? AuthorProfileImageUrl,
  decimal AverageRating,
  int RatingCount,
  int ViewCount,
  int CommentCount,
  DateTime CreatedDate,
  List<SquadSlotResponseDto> Slots,
  decimal? CurrentUserScore = null,
  bool IsAuthorFollowedByCurrentUser = false);

public sealed record CreatedSquadResponseDto(
  Guid Id,
  string Title,
  string Formation);

public sealed record SquadPreviewDto(
  Guid Id,
  string Title,
  string Formation,
  string Notes,
  string AttackStyle,
  string DefenseLine,
  string Tempo,
  int CaptainPlayerId,
  int CornerTakerPlayerId,
  int FreeKickTakerPlayerId,
  Guid UserId,
  string AuthorUsername,
  string? AuthorDisplayTag,
  string? AuthorProfileImageUrl,
  decimal AverageRating,
  int RatingCount,
  int ViewCount,
  int CommentCount,
  DateTime CreatedDate,
  List<SquadSlotResponseDto> Slots);

public sealed record SquadRatingResponseDto(
  Guid SquadId,
  decimal Score,
  decimal AverageRating,
  int RatingCount);

// Requests
public sealed record SquadSlotRequest(
  string SlotKey,
  int SortOrder,
  int PlayerId,
  int? PositionRoleId = null);

public sealed record CreateSquadRequest(
  string Title,
  string Formation,
  string Notes,
  string AttackStyle,
  string DefenseLine,
  string Tempo,
  int CaptainPlayerId,
  int CornerTakerPlayerId,
  int FreeKickTakerPlayerId,
  List<SquadSlotRequest> Slots);

public sealed record UpdateSquadRequest(
  Guid Id,
  string Title,
  string Formation,
  string Notes,
  string AttackStyle,
  string DefenseLine,
  string Tempo,
  int CaptainPlayerId,
  int CornerTakerPlayerId,
  int FreeKickTakerPlayerId,
  List<SquadSlotRequest> Slots);

public sealed record RateSquadRequest(decimal Score);

public sealed record MySquadStatsDto(
  int TotalSquads,
  int TotalViewCount,
  decimal AverageRating);

public sealed record SquadListQueryRequest(
  string? Search = null,
  string? Sort = null,
  int PageNumber = 1,
  int PageSize = 6);
