namespace Api.Features.Positions;

// Responses
public sealed record PositionResponseDto(
  int Id,
  string Name,
  string Abbreviation,
  DateTime CreatedDate);

// Requests
public sealed record CreatePositionRequest(
  string Name,
  string Abbreviation);

public sealed record UpdatePositionRequest(
  int Id,
  string Name,
  string Abbreviation);
