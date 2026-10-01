using System.Linq.Expressions;
using Api.Core.Repositories;
using Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Comments;

public class EfCommentRepository : EfBaseRepository<BaseDbContext, Comment, Guid>, ICommentRepository
{
  public EfCommentRepository(BaseDbContext context) : base(context)
  {
  }

  public async Task<List<Comment>> GetRecentCommentsAsync(
    int count,
    Expression<Func<Comment, bool>>? filter = null,
    DateTime? lastDateCursor = null,
    Guid? lastIdCursor = null,
    Func<IQueryable<Comment>, IQueryable<Comment>>? include = null,
    Func<IQueryable<Comment>, IOrderedQueryable<Comment>>? orderBy = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    IQueryable<Comment> query = Query(enableTracking, withDeleted);

    if (filter != null)
    {
      query = query.Where(filter);
    }

    if (include != null)
    {
      query = include(query);
    }

    query = query.Where(c => c.IsApproved);

    if (lastDateCursor.HasValue && lastIdCursor.HasValue)
    {
      query = query.Where(c => c.CreatedDate < lastDateCursor ||
                              (c.CreatedDate == lastDateCursor && c.Id.CompareTo(lastIdCursor.Value) < 0));
    }

    IOrderedQueryable<Comment> orderedQuery = orderBy != null
      ? orderBy(query)
      : query.OrderByDescending(c => c.CreatedDate).ThenByDescending(c => c.Id);

    return await orderedQuery
      .Take(count)
      .ToListAsync(cancellationToken);
  }
}
