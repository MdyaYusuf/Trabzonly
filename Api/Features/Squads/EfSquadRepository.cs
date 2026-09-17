using Api.Core.Repositories;
using Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Squads;

public class EfSquadRepository : EfBaseRepository<BaseDbContext, Squad, Guid>, ISquadRepository
{
  public EfSquadRepository(BaseDbContext context) : base(context)
  {

  }

  public async Task<List<Squad>> GetRecentSquadsAsync(
    int count,
    DateTime? lastDateCursor = null,
    Guid? lastIdCursor = null,
    Func<IQueryable<Squad>, IQueryable<Squad>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    IQueryable<Squad> query = Query(enableTracking, withDeleted);

    if (include != null)
    {
      query = include(query);
    }

    if (lastDateCursor.HasValue && lastIdCursor.HasValue)
    {
      query = query.Where(s => s.CreatedDate < lastDateCursor ||
                              (s.CreatedDate == lastDateCursor && s.Id.CompareTo(lastIdCursor.Value) < 0));
    }

    return await query
      .OrderByDescending(s => s.CreatedDate)
      .ThenByDescending(s => s.Id)
      .Take(count)
      .ToListAsync(cancellationToken);
  }

  public async Task<List<Squad>> GetTopRatedSquadsAsync(
    int count,
    Func<IQueryable<Squad>, IQueryable<Squad>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    IQueryable<Squad> query = Query(enableTracking, withDeleted);

    if (include != null)
    {
      query = include(query);
    }

    return await query
      .OrderByDescending(s => s.AverageRating)
      .ThenByDescending(s => s.RatingCount)
      .ThenByDescending(s => s.CreatedDate)
      .Take(count)
      .ToListAsync(cancellationToken);
  }
}
