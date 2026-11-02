namespace Api.Features.Positions;

// Responses
public sealed record PositionRoleResponseDto(
  int Id,
  string Name,
  string Description,
  int SortOrder);

public sealed record PositionResponseDto(
  int Id,
  string Name,
  string Abbreviation,
  PositionZone Zone,
  DateTime CreatedDate,
  DateTime? UpdatedDate,
  List<PositionRoleResponseDto> Roles);

// Requests
public sealed record PositionRoleRequest(
  int? Id,
  string Name,
  string Description,
  int SortOrder);

public sealed record CreatePositionRequest(
  string Name,
  string Abbreviation,
  PositionZone Zone,
  List<PositionRoleRequest> Roles);

public sealed record UpdatePositionRequest(
  int Id,
  string Name,
  string Abbreviation,
  PositionZone Zone,
  List<PositionRoleRequest> Roles);

public sealed record PositionAdminListQueryRequest(
  string? Search = null,
  PositionZone? Zone = null,
  string? Sort = null);

public static class PositionSortOptions
{
  public const string NameAsc = "name-asc";
  public const string AbbreviationAsc = "abbreviation-asc";
  public const string ZoneAsc = "zone-asc";
}
