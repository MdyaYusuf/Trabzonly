namespace Api.Features.Positions;

// Responses
public sealed record PositionResponseDto(
  Guid Id,
  string Name,
  string Abbreviation,
  DateTime CreatedDate);

// Requests
public sealed record CreatePositionRequest(
  string Name,
  string Abbreviation);

public sealed record UpdatePositionRequest(
  Guid Id,
  string Name,
  string Abbreviation);