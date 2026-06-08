using Api.Core.Repositories;

namespace Api.Features.Posts;

public interface IPostRepository : IRepository<Post, Guid>
{
  Task<List<Post>> GetTopCommentedPostsAsync(
    int count,
    Func<IQueryable<Post>, IQueryable<Post>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<List<Post>> GetRecentPostsAsync(
    int count,
    DateTime? lastDateCursor = null,
    Guid? lastIdCursor = null,
    Func<IQueryable<Post>, IQueryable<Post>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);
}