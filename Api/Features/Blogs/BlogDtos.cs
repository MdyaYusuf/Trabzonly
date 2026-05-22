namespace Api.Features.Blogs;

// Responses
public sealed record BlogResponseDto
{
  public Guid Id { get; init; }
  public string Title { get; init; } = default!;
  public string? Description { get; init; }
  public string Content { get; init; } = default!;
  public string? ImageUrl { get; init; }
  public bool IsActive { get; init; }
  public Guid UserId { get; init; }
  public string AuthorUsername { get; init; } = default!;
}

// Requests
public sealed record CreateBlogRequest(
  string Title,
  string? Description,
  string Content,
  IFormFile? ImageFile);

public sealed record UpdateBlogRequest(
  Guid Id,
  string Title,
  string? Description,
  string Content,
  IFormFile? ImageFile,
  bool IsActive);