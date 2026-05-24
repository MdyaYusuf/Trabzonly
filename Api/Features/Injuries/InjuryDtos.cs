namespace Api.Features.Injuries;

// Responses
public sealed record InjuryResponseDto(
  Guid Id,
  string Name,
  int DaysInjured,
  int GamesMissed,
  Guid PlayerId,
  string PlayerName,
  Guid? SeasonId,
  string? SeasonName,
  DateTime CreatedDate);

public sealed record CreatedInjuryResponseDto(
  Guid Id,
  string Name,
  Guid PlayerId);

// Requests
public sealed record CreateInjuryRequest(
  string Name,
  int DaysInjured,
  int GamesMissed,
  Guid PlayerId,
  Guid? SeasonId);

public sealed record UpdateInjuryRequest(
  Guid Id,
  string Name,
  int DaysInjured,
  int GamesMissed,
  Guid PlayerId,
  Guid? SeasonId);