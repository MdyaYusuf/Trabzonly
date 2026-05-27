using Api.Core.Repositories;
using Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Quizzes;

public class EfQuizRepository : EfBaseRepository<BaseDbContext, Quiz, Guid>, IQuizRepository
{
  public EfQuizRepository(BaseDbContext context) : base(context)
  {

  }

  public async Task<List<Quiz>> GetMostTakenQuizzesAsync(
    int count,
    Func<IQueryable<Quiz>, IQueryable<Quiz>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    IQueryable<Quiz> query = Query(enableTracking, withDeleted);

    if (include != null)
    {
      query = include(query);
    }

    return await query
      .Where(q => q.IsActive)
      .OrderByDescending(q => q.UserQuizResults.Count)
      .Take(count)
      .ToListAsync(cancellationToken);
  }

  public async Task<List<Quiz>> GetRecentQuizzesAsync(
    int count,
    DateTime? lastDateCursor = null,
    Guid? lastIdCursor = null,
    Func<IQueryable<Quiz>, IQueryable<Quiz>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    IQueryable<Quiz> query = Query(enableTracking, withDeleted);

    if (include != null)
    {
      query = include(query);
    }

    if (lastDateCursor.HasValue && lastIdCursor.HasValue)
    {
      query = query.Where(q => q.CreatedDate < lastDateCursor ||
                              (q.CreatedDate == lastDateCursor && q.Id.CompareTo(lastIdCursor.Value) < 0));
    }

    return await query
      .Where(q => q.IsActive)
      .OrderByDescending(q => q.CreatedDate).ThenByDescending(q => q.Id)
      .Take(count)
      .ToListAsync(cancellationToken);
  }
}