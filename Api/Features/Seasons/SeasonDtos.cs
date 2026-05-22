namespace Api.Features.Seasons;

// Responses
public sealed record SeasonResponseDto(
  Guid Id,
  string Name,
  DateTime StartDate,
  DateTime EndDate,
  DateTime CreatedDate);

// Requests
public sealed record CreateSeasonRequest(
  string Name,
  DateTime StartDate,
  DateTime EndDate);

public sealed record UpdateSeasonRequest(
  Guid Id,
  string Name,
  DateTime StartDate,
  DateTime EndDate);