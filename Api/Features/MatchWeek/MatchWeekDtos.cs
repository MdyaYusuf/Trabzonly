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
