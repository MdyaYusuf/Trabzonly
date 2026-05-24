namespace Api.Features.Comments;

// Responses
public sealed record CommentResponseDto(
  Guid Id,
  string Content,
  bool IsApproved,
  Guid UserId,
  string AuthorUsername,
  Guid? BlogId,
  Guid? PlayerId,
  Guid? ParentCommentId,
  DateTime CreatedDate);

public sealed record CreatedCommentResponseDto(
  Guid Id,
  string Content,
  bool IsApproved);

// Requests
public sealed record CreateCommentRequest(
  string Content,
  Guid? BlogId,
  Guid? PlayerId,
  Guid? ParentCommentId);

public sealed record UpdateCommentRequest(
  Guid Id,
  string Content);