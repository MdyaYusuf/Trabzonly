using Api.Core.Repositories;

namespace Api.Features.Blogs;

public interface IBlogRepository : IRepository<Blog, Guid>
{
  Task<List<Blog>> GetTopCommentedBlogsAsync(
    int count,
    Func<IQueryable<Blog>, IQueryable<Blog>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<List<Blog>> GetRecentBlogsAsync(
    int count,
    DateTime? lastDateCursor = null,
    Guid? lastIdCursor = null,
    Func<IQueryable<Blog>, IQueryable<Blog>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);
}