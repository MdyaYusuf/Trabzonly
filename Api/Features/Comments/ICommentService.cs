using System.Linq.Expressions;
using Api.Core.Responses;

namespace Api.Features.Comments;

public interface ICommentService
{
  Task<ReturnModel<PagedResponse<CommentResponseDto>>> GetAllAsync(
    Expression<Func<Comment, bool>>? filter = null,
    Func<IQueryable<Comment>, IQueryable<Comment>>? include = null,
    Func<IQueryable<Comment>, IOrderedQueryable<Comment>>? orderBy = null,
    int pageNumber = 1,
    int pageSize = 10,
    bool enableTracking = false,
    bool withDeleted = false,
    Guid? currentUserId = null,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<CursorPagedResponse<CommentResponseDto>>> GetRecentCommentsAsync(
    int count,
    Expression<Func<Comment, bool>>? filter = null,
    DateTime? lastDateCursor = null,
    Guid? lastIdCursor = null,
    Func<IQueryable<Comment>, IQueryable<Comment>>? include = null,
    Func<IQueryable<Comment>, IOrderedQueryable<Comment>>? orderBy = null,
    bool enableTracking = false,
    bool withDeleted = false,
    Guid? currentUserId = null,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<CommentResponseDto>> GetByIdAsync(
    Guid id,
    Func<IQueryable<Comment>, IQueryable<Comment>>? include = null,
    bool enableTracking = false,
    Guid? currentUserId = null,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<CreatedCommentResponseDto>> AddAsync(
    CreateCommentRequest request,
    Guid currentUserId,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> UpdateAsync(
    UpdateCommentRequest request,
    Guid currentUserId,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> RemoveAsync(
    Guid id,
    Guid currentUserId,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<CommentReactionResponseDto>> ReactAsync(
    Guid commentId,
    Guid currentUserId,
    CommentReactionType reactionType,
    CancellationToken cancellationToken = default);
}
