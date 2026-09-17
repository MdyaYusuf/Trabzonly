namespace Api.Features.Squads;

// Responses
public sealed record SquadSlotResponseDto(
  Guid Id,
  string SlotKey,
  int SortOrder,
  Guid PlayerId,
  string PlayerName,
  string? PlayerImageUrl,
  string PositionAbbreviation);

public sealed record SquadResponseDto(
  Guid Id,
  string Title,
  string Formation,
  Guid UserId,
  string AuthorUsername,
  decimal AverageRating,
  int RatingCount,
  DateTime CreatedDate,
  List<SquadSlotResponseDto> Slots,
  decimal? CurrentUserScore = null);

public sealed record CreatedSquadResponseDto(
  Guid Id,
  string Title,
  string Formation);

public sealed record SquadPreviewDto(
  Guid Id,
  string Title,
  string Formation,
  Guid UserId,
  string AuthorUsername,
  decimal AverageRating,
  int RatingCount,
  DateTime CreatedDate);

public sealed record SquadRatingResponseDto(
  Guid SquadId,
  decimal Score,
  decimal AverageRating,
  int RatingCount);

// Requests
public sealed record SquadSlotRequest(
  string SlotKey,
  int SortOrder,
  Guid PlayerId);

public sealed record CreateSquadRequest(
  string Title,
  string Formation,
  List<SquadSlotRequest> Slots);

public sealed record UpdateSquadRequest(
  Guid Id,
  string Title,
  string Formation,
  List<SquadSlotRequest> Slots);

public sealed record RateSquadRequest(decimal Score);
