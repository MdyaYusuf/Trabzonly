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