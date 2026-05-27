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

    if (lastDateCursor.HasValue && lastIdCursor.HasValue)
    {
      query = query.Where(c => c.CreatedDate < lastDateCursor ||
                              (c.CreatedDate == lastDateCursor && c.Id.CompareTo(lastIdCursor.Value) < 0));
    }

    return await query
      .Where(c => c.IsApproved)
      .OrderByDescending(c => c.CreatedDate)
      .ThenByDescending(c => c.Id)
      .Take(count)
      .ToListAsync(cancellationToken);
  }
}