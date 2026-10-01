namespace Api.Features.Injuries;

// Responses
public sealed record InjuryResponseDto(
  int Id,
  string Name,
  int DaysInjured,
  int GamesMissed,
  int PlayerId,
  string PlayerName,
  int? SeasonId,
  string? SeasonName,
  DateTime CreatedDate);

public sealed record CreatedInjuryResponseDto(
  int Id,
  string Name,
  int PlayerId);

// Requests
public sealed record CreateInjuryRequest(
  string Name,
  int DaysInjured,
  int GamesMissed,
  int PlayerId,
  int? SeasonId);

public sealed record UpdateInjuryRequest(
  int Id,
  string Name,
  int DaysInjured,
  int GamesMissed,
  int PlayerId,
  int? SeasonId);