using System.Linq.Expressions;
using Api.Core.Responses;

namespace Api.Features.Blogs;

public interface IBlogService
{
  Task<ReturnModel<List<BlogResponseDto>>> GetAllAsync(
    Expression<Func<Blog, bool>>? filter = null,
    Func<IQueryable<Blog>, IQueryable<Blog>>? include = null,
    Func<IQueryable<Blog>, IOrderedQueryable<Blog>>? orderBy = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<BlogResponseDto>> GetAsync(
    Expression<Func<Blog, bool>> predicate,
    Func<IQueryable<Blog>, IQueryable<Blog>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<BlogResponseDto>> GetByIdAsync(
    Guid id,
    Func<IQueryable<Blog>, IQueryable<Blog>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<List<BlogResponseDto>>> GetTopCommentedBlogsAsync(
    int count,
    Func<IQueryable<Blog>, IQueryable<Blog>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<List<BlogResponseDto>>> GetRecentBlogsAsync(
    int count,
    Func<IQueryable<Blog>, IQueryable<Blog>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<CreatedBlogResponseDto>> AddAsync(
    CreateBlogRequest request,
    Guid currentUserId,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> UpdateAsync(
    UpdateBlogRequest request,
    Guid currentUserId,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> RemoveAsync(
    Guid id,
    Guid currentUserId,
    string userRole,
    CancellationToken cancellationToken = default);
}