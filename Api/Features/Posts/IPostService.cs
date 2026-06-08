using System.Linq.Expressions;
using Api.Core.Responses;

namespace Api.Features.Posts;

public interface IPostService
{
  Task<ReturnModel<PagedResponse<PostResponseDto>>> GetAllAsync(
    Expression<Func<Post, bool>>? filter = null,
    Func<IQueryable<Post>, IQueryable<Post>>? include = null,
    Func<IQueryable<Post>, IOrderedQueryable<Post>>? orderBy = null,
    int pageNumber = 1,
    int pageSize = 10,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<PostResponseDto>> GetAsync(
    Expression<Func<Post, bool>> predicate,
    Func<IQueryable<Post>, IQueryable<Post>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<PostResponseDto>> GetByIdAsync(
    Guid id,
    Func<IQueryable<Post>, IQueryable<Post>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<List<PostResponseDto>>> GetTopCommentedPostsAsync(
    int count,
    Func<IQueryable<Post>, IQueryable<Post>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<CursorPagedResponse<PostResponseDto>>> GetRecentPostsAsync(
    int count,
    DateTime? lastDateCursor = null,
    Guid? lastIdCursor = null,
    Func<IQueryable<Post>, IQueryable<Post>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<CreatedPostResponseDto>> AddAsync(
    CreatePostRequest request,
    Guid currentUserId,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> UpdateAsync(
    UpdatePostRequest request,
    Guid currentUserId,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> RemoveAsync(
    Guid id,
    Guid currentUserId,
    string userRole,
    CancellationToken cancellationToken = default);
}