namespace Api.Features.Seasons;

// Responses
public sealed record SeasonResponseDto(
  int Id,
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
  int Id,
  string Name,
  DateTime StartDate,
  DateTime EndDate);