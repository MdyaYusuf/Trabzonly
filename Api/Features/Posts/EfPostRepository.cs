using Api.Core.Repositories;
using Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Posts;

public class EfPostRepository : EfBaseRepository<BaseDbContext, Post, Guid>, IPostRepository
{
  public EfPostRepository(BaseDbContext context) : base(context)
  {

  }

  public async Task<List<Post>> GetTopCommentedPostsAsync(
    int count,
    Func<IQueryable<Post>, IQueryable<Post>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    IQueryable<Post> query = Query(enableTracking, withDeleted);

    if (include != null)
    {
      query = include(query);
    }

    return await query
      .Where(b => b.IsActive)
      .OrderByDescending(b => b.Comments.Count)
      .Take(count)
      .ToListAsync(cancellationToken);
  }

  public async Task<List<Post>> GetRecentPostsAsync(
    int count,
    DateTime? lastDateCursor = null,
    Guid? lastIdCursor = null,
    Func<IQueryable<Post>, IQueryable<Post>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    IQueryable<Post> query = Query(enableTracking, withDeleted);

    if (include != null)
    {
      query = include(query);
    }

    if (lastDateCursor.HasValue && lastIdCursor.HasValue)
    {
      query = query.Where(b => b.CreatedDate < lastDateCursor ||
                              (b.CreatedDate == lastDateCursor && b.Id.CompareTo(lastIdCursor.Value) < 0));
    }

    return await query
      .Where(b => b.IsActive)
      .OrderByDescending(b => b.CreatedDate).ThenByDescending(b => b.Id)
      .Take(count)
      .ToListAsync(cancellationToken);
  }
}