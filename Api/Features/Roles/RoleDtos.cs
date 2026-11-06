namespace Api.Features.Roles;

// Responses
public sealed record RoleResponseDto
{
  public int Id { get; init; }
  public string Name { get; init; } = default!;
  public bool IsSystem { get; init; }
  public DateTime CreatedDate { get; init; }
  public DateTime? UpdatedDate { get; init; }
}

public sealed record RoleAdminListItemDto(
  int Id,
  string Name,
  int MemberCount,
  bool IsSystem,
  DateTime CreatedDate,
  DateTime? UpdatedDate);

// Requests
public sealed record CreateRoleRequest(string Name);
public sealed record UpdateRoleRequest(int Id, string Name);

public sealed record RoleAdminListQueryRequest(
  string? Search = null,
  bool? IsSystem = null,
  string? Sort = null);

public static class RoleSortOptions
{
  public const string NameAsc = "name-asc";
  public const string MembersAsc = "members-asc";
  public const string MembersDesc = "members-desc";
}
