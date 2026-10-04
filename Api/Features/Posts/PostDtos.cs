namespace Api.Features.Posts;

// Responses
public sealed record PostPollOptionSummaryDto
{
  public int Id { get; init; }
  public string Label { get; init; } = default!;
  public int SortOrder { get; init; }
  public int VoteCount { get; init; }
}

public sealed record PostPollSummaryDto
{
  public int Id { get; init; }
  public string Question { get; init; } = default!;
  public int TotalVotes { get; init; }
  public IReadOnlyList<PostPollOptionSummaryDto> Options { get; init; } = [];
}

public sealed record PostTopCommentDto
{
  public Guid Id { get; init; }
  public string Content { get; init; } = default!;
  public string AuthorUsername { get; init; } = default!;
  public string? AuthorDisplayTag { get; init; }
  public int LikeCount { get; init; }
  public int DislikeCount { get; init; }
}

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
  public int CommentCount { get; init; }
  public DateTime CreatedDate { get; init; }
  public Guid UserId { get; init; }
  public string AuthorUsername { get; init; } = default!;
  public string? AuthorDisplayTag { get; init; }
  public int CategoryId { get; init; }
  public string CategoryName { get; init; } = default!;
  public PostPollSummaryDto? Poll { get; init; }
  public PostTopCommentDto? TopComment { get; init; }
  public bool IsAuthorFollowedByCurrentUser { get; init; }
  public PostReactionType? CurrentReaction { get; init; }
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
  public int CommentCount { get; init; }
}

// Requests
public sealed record CreatePostPollRequest(
  string Question,
  IReadOnlyList<string> Options);

public sealed record CreatePostRequest(
  string Title,
  string? Description,
  string Content,
  int CategoryId,
  IFormFile? ImageFile,
  CreatePostPollRequest? Poll = null);

public sealed record UpdatePostRequest(
  Guid Id,
  string Title,
  string? Description,
  string Content,
  int CategoryId,
  IFormFile? ImageFile,
  bool IsActive,
  CreatePostPollRequest? Poll = null,
  bool DeactivatePoll = false);

public sealed record PostReactionResponseDto(
  Guid PostId,
  int LikeCount,
  int DislikeCount,
  PostReactionType? CurrentReaction);
