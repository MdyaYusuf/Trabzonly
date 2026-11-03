namespace Api.Features.Categories;

// Responses
public sealed record CategoryResponseDto
{
  public int Id { get; init; }
  public string Name { get; init; } = default!;
  public string? Description { get; init; }
  public bool IsActive { get; init; }
  public DateTime CreatedDate { get; init; }
  public DateTime? UpdatedDate { get; init; }
}

public sealed record CategoryAdminListItemDto(
  int Id,
  string Name,
  string? Description,
  bool IsActive,
  int PostCount,
  DateTime CreatedDate,
  DateTime? UpdatedDate);

public sealed record CategoryAdminSummaryDto(
  int TotalCount,
  int ActiveCount,
  int InactiveCount);

// Requests
public sealed record CreateCategoryRequest(
  string Name,
  string? Description);

public sealed record UpdateCategoryRequest(
  int Id,
  string Name,
  string? Description,
  bool IsActive);

public sealed record CategoryAdminListQueryRequest(
  string? Search = null,
  bool? IsActive = null,
  string? Sort = null);

public static class CategorySortOptions
{
  public const string NameAsc = "name-asc";
  public const string PostsAsc = "posts-asc";
  public const string PostsDesc = "posts-desc";
}
