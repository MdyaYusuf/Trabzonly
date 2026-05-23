namespace Api.Features.Categories;

// Responses
public sealed record CategoryResponseDto
{
  public int Id { get; init; }
  public string Name { get; init; } = default!;
  public string? Description { get; init; }
  public bool IsActive { get; init; }
}

// Requests
public sealed record CreateCategoryRequest(
  string Name,
  string? Description);

public sealed record UpdateCategoryRequest(
  int Id,
  string Name,
  string? Description,
  bool IsActive);