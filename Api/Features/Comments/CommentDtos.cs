namespace Api.Features.Comments;

// Responses
public sealed record CommentResponseDto(
  Guid Id,
  string Content,
  bool IsApproved,
  int LikeCount,
  int DislikeCount,
  Guid UserId,
  string AuthorUsername,
  Guid? PostId,
  int? PlayerId,
  Guid? ParentCommentId,
  DateTime CreatedDate,
  CommentReactionType? CurrentUserReaction = null);

public sealed record CreatedCommentResponseDto(
  Guid Id,
  string Content,
  bool IsApproved);

public sealed record CommentReactionResponseDto(
  Guid CommentId,
  int LikeCount,
  int DislikeCount,
  CommentReactionType? CurrentReaction);

// Requests
public sealed record CreateCommentRequest(
  string Content,
  Guid? PostId,
  int? PlayerId,
  Guid? ParentCommentId);

public sealed record UpdateCommentRequest(
  Guid Id,
  string Content);