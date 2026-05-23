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

    return await query
      .OrderByDescending(s => s.Goals)
      .Take(count)
      .ToListAsync(cancellationToken);
  }

  public async Task<List<PlayerStats>> GetTopAssistersAsync(
    int count,
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

    return await query
      .OrderByDescending(s => s.Assists)
      .Take(count)
      .ToListAsync(cancellationToken);
  }
}