using Api.Core.Repositories;
using Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Stats;

public class EfPlayerStatsRepository : EfBaseRepository<BaseDbContext, PlayerStats, Guid>, IPlayerStatsRepository
{
  public EfPlayerStatsRepository(BaseDbContext context) : base(context)
  {

  }

  public async Task<List<PlayerStats>> GetTopScorersAsync(
    int count,
    int? lastValueCursor = null,
    Guid? lastIdCursor = null,
    Func<IQueryable<PlayerStats>, IQueryable<PlayerStats>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    IQueryable<PlayerStats> query = Query(enableTracking, withDeleted);

    if (include != null)
    {
      query = include(query);
    }

    if (lastValueCursor.HasValue && lastIdCursor.HasValue)
    {
      query = query.Where(s => s.Goals < lastValueCursor ||
                              (s.Goals == lastValueCursor && s.Id.CompareTo(lastIdCursor.Value) < 0));
    }

    return await query
      .OrderByDescending(s => s.Goals).ThenByDescending(s => s.Id)
      .Take(count)
      .ToListAsync(cancellationToken);
  }

  public async Task<List<PlayerStats>> GetTopAssistersAsync(
    int count,
    int? lastValueCursor = null,
    Guid? lastIdCursor = null,
    Func<IQueryable<PlayerStats>, IQueryable<PlayerStats>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    IQueryable<PlayerStats> query = Query(enableTracking, withDeleted);

    if (include != null)
    {
      query = include(query);
    }

    if (lastValueCursor.HasValue && lastIdCursor.HasValue)
    {
      query = query.Where(s => s.Assists < lastValueCursor ||
                              (s.Assists == lastValueCursor && s.Id.CompareTo(lastIdCursor.Value) < 0));
    }

    return await query
      .OrderByDescending(s => s.Assists).ThenByDescending(s => s.Id)
      .Take(count)
      .ToListAsync(cancellationToken);
  }
}