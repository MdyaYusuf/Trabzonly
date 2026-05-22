namespace Api.Features.Stats;

// Responses
public sealed record PlayerStatsResponseDto(
  Guid Id,
  string Team,
  int Appearances,
  int MinutesPlayed,
  int Goals,
  int Assists,
  int YellowCards,
  int RedCards,
  int CleanSheets,
  int Saves,
  int GoalsConceded,
  Guid PlayerId,
  string PlayerName,
  Guid SeasonId,
  string SeasonName,
  DateTime CreatedDate);

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
  int Saves,
  int GoalsConceded,
  Guid PlayerId,
  Guid SeasonId);

public sealed record UpdatePlayerStatsRequest(
  Guid Id,
  string Team,
  int Appearances,
  int MinutesPlayed,
  int Goals,
  int Assists,
  int YellowCards,
  int RedCards,
  int CleanSheets,
  int Saves,
  int GoalsConceded,
  Guid PlayerId,
  Guid SeasonId);