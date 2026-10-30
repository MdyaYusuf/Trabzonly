namespace Api.Features.Stats;

// Responses
public sealed record PlayerStatsResponseDto(
  int Id,
  string Team,
  int Appearances,
  int MinutesPlayed,
  int Goals,
  int Assists,
  int YellowCards,
  int RedCards,
  int CleanSheets,
  int GoalsConceded,
  int PlayerId,
  string PlayerName,
  int? ShirtNumber,
  string Nationality,
  string PositionName,
  string PositionAbbreviation,
  int SeasonId,
  string SeasonName,
  DateTime CreatedDate);

public sealed record CreatedPlayerStatsResponseDto(
  int Id,
  string Team,
  int PlayerId,
  int SeasonId);

// Requests
public sealed record CreatePlayerStatsRequest(
  string Team,
  int Appearances,
  int MinutesPlayed,
  int Goals,
  int Assists,
  int YellowCards,
  int RedCards,
  int CleanSheets,
  int GoalsConceded,
  int PlayerId,
  int SeasonId);

public sealed record UpdatePlayerStatsRequest(
  int Id,
  string Team,
  int Appearances,
  int MinutesPlayed,
  int Goals,
  int Assists,
  int YellowCards,
  int RedCards,
  int CleanSheets,
  int GoalsConceded,
  int PlayerId,
  int SeasonId);

public sealed record PlayerStatsAdminListQueryRequest(
  string? Search = null,
  int? SeasonId = null,
  int? PlayerId = null,
  string? Team = null,
  string? PositionGroup = null,
  string? Sort = null,
  int PageNumber = 1,
  int PageSize = 10);

public static class PlayerStatsSortOptions
{
  public const string GoalsDesc = "goals-desc";
  public const string AssistsDesc = "assists-desc";
  public const string MatchesDesc = "matches-desc";
  public const string MinutesDesc = "minutes-desc";
}
