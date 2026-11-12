namespace Api.Features.MatchWeek;

// Clubs
public sealed record ClubResponseDto(
  int Id,
  string Name,
  string? ShortName,
  bool IsTrabzonspor);

// Fixtures
public sealed record FixtureClubDto(
  int Id,
  string Name,
  string? ShortName,
  bool IsTrabzonspor);

public sealed record FixtureResponseDto(
  int Id,
  int SeasonId,
  int WeekNumber,
  FixtureClubDto HomeClub,
  FixtureClubDto AwayClub,
  DateTime? Kickoff,
  int? HomeScore,
  int? AwayScore);

public sealed record FixtureWeekResponseDto(
  int SeasonId,
  int WeekNumber,
  IReadOnlyList<FixtureResponseDto> Fixtures);

public sealed record UpdateFixtureRequest(
  int Id,
  DateTime? Kickoff,
  int? HomeScore,
  int? AwayScore);

public sealed record UpdateFixtureWeekItemRequest(
  int Id,
  DateTime? Kickoff,
  int? HomeScore,
  int? AwayScore);

public sealed record UpdateFixtureWeekRequest(
  int SeasonId,
  int WeekNumber,
  IReadOnlyList<UpdateFixtureWeekItemRequest> Fixtures);

// Standings
public sealed record LeagueStandingResponseDto(
  int Id,
  int SeasonId,
  int ClubId,
  string ClubName,
  string? ClubShortName,
  bool IsTrabzonspor,
  int Played,
  int Won,
  int Drawn,
  int Lost,
  int GoalsFor,
  int GoalsAgainst,
  int GoalDifference,
  int Points,
  int Rank);

public sealed record LeagueStandingsResponseDto(
  int SeasonId,
  IReadOnlyList<LeagueStandingResponseDto> Standings);

// Living MatchWeek board
public sealed record MatchWeekSlotResponseDto(
  int Id,
  int PlayerId,
  string PlayerName,
  string? PlayerImageUrl,
  int? ShirtNumber,
  string? PositionAbbreviation,
  string SlotKey,
  bool IsStarter,
  int SortOrder,
  decimal AverageRating,
  int RatingCount,
  decimal? CurrentUserScore);

public sealed record MatchWeekResponseDto(
  int? Id,
  int SeasonId,
  string Formation,
  IReadOnlyList<MatchWeekSlotResponseDto> Slots,
  DateTime? UpdatedDate);

public sealed record MatchWeekSlotRequest(
  string SlotKey,
  int SortOrder,
  int PlayerId);

public sealed record SaveMatchWeekRequest(
  string Formation,
  IReadOnlyList<MatchWeekSlotRequest> Slots);

public sealed record RateMatchWeekPlayerRequest(decimal Score);

public sealed record MatchWeekPlayerRatingResponseDto(
  int MatchWeekId,
  int PlayerId,
  decimal Score,
  decimal AverageRating,
  int RatingCount);

public sealed record MatchWeekLeaderboardEntryDto(
  int Rank,
  int PlayerId,
  string PlayerName,
  string? PlayerImageUrl,
  int? ShirtNumber,
  string SlotKey,
  bool IsStarter,
  decimal AverageRating,
  int RatingCount);

public sealed record MatchWeekLeaderboardResponseDto(
  int MatchWeekId,
  IReadOnlyList<MatchWeekLeaderboardEntryDto> Entries);
