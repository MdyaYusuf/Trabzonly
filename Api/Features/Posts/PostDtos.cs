namespace Api.Features.Posts;

// Responses
public sealed record PostResponseDto
{
  public Guid Id { get; init; }
  public string Title { get; init; } = default!;
  public string? Description { get; init; }
  public string Content { get; init; } = default!;
  public string? ImageUrl { get; init; }
  public bool IsActive { get; init; }
  public int LikeCount { get; init; }
  public int DislikeCount { get; init; }
  public Guid UserId { get; init; }
  public string AuthorUsername { get; init; } = default!;
  public int CategoryId { get; init; }
  public string CategoryName { get; init; } = default!;
}

public sealed record CreatedPostResponseDto
{
  public Guid Id { get; init; }
  public string Title { get; init; } = default!;
  public string? ImageUrl { get; init; }
}

public sealed record PostPreviewDto
{
  public Guid Id { get; init; }
  public string Title { get; init; } = default!;
  public string? Description { get; init; }
  public string? ImageUrl { get; init; }
  public string AuthorUsername { get; init; } = default!;
  public string CategoryName { get; init; } = default!;
  public DateTime CreatedDate { get; init; }
  public int LikeCount { get; init; }
  public int DislikeCount { get; init; }
}

// Requests
public sealed record CreatePostRequest(
  string Title,
  string? Description,
  string Content,
  int CategoryId,
  IFormFile? ImageFile);

public sealed record UpdatePostRequest(
  Guid Id,
  string Title,
  string? Description,
  string Content,
  int CategoryId,
  IFormFile? ImageFile,
  bool IsActive);