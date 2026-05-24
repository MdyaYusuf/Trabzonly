using System.Linq.Expressions;
using Api.Core.Responses;

namespace Api.Features.Comments;

public interface ICommentService
{
  Task<ReturnModel<List<CommentResponseDto>>> GetAllAsync(
    Expression<Func<Comment, bool>>? filter = null,
    Func<IQueryable<Comment>, IQueryable<Comment>>? include = null,
    Func<IQueryable<Comment>, IOrderedQueryable<Comment>>? orderBy = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<CommentResponseDto>> GetByIdAsync(
    Guid id,
    Func<IQueryable<Comment>, IQueryable<Comment>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<CreatedCommentResponseDto>> AddAsync(
    CreateCommentRequest request,
    Guid currentUserId,
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
}