using Api.Core.Repositories;
using Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Blogs;

public class EfBlogRepository : EfBaseRepository<BaseDbContext, Blog, Guid>, IBlogRepository
{
  public EfBlogRepository(BaseDbContext context) : base(context)
  {
  }

  public async Task<List<Blog>> GetTopCommentedBlogsAsync(
    int count,
    Func<IQueryable<Blog>, IQueryable<Blog>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    IQueryable<Blog> query = Query(enableTracking, withDeleted);

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

  public async Task<List<Blog>> GetRecentBlogsAsync(
    int count,
    Func<IQueryable<Blog>, IQueryable<Blog>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    IQueryable<Blog> query = Query(enableTracking, withDeleted);

    if (include != null)
    {
      query = include(query);
    }

    return await query
      .Where(b => b.IsActive)
      .OrderByDescending(b => b.CreatedDate)
      .Take(count)
      .ToListAsync(cancellationToken);
  }
}