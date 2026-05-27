using Api.Core.Repositories;
using Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Players;

public class EfPlayerRepository : EfBaseRepository<BaseDbContext, Player, Guid>, IPlayerRepository
{
  public EfPlayerRepository(BaseDbContext context) : base(context)
  {

  }

  public async Task<List<Player>> GetTopValuedPlayersAsync(
    int count,
    decimal? lastValueCursor = null,
    Guid? lastIdCursor = null,
    Func<IQueryable<Player>, IQueryable<Player>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    IQueryable<Player> query = Query(enableTracking, withDeleted);

    if (include != null)
    {
      query = include(query);
    }

    if (lastValueCursor.HasValue && lastIdCursor.HasValue)
    {
      query = query.Where(p => p.MarketValue < lastValueCursor ||
                              (p.MarketValue == lastValueCursor && p.Id.CompareTo(lastIdCursor.Value) < 0));
    }

    return await query
      .Where(p => p.IsActive && p.MarketValue.HasValue)
      .OrderByDescending(p => p.MarketValue).ThenByDescending(p => p.Id)
      .Take(count)
      .ToListAsync(cancellationToken);
  }

  public async Task<List<Player>> GetMostCommentedPlayersAsync(
    int count,
    Func<IQueryable<Player>, IQueryable<Player>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    IQueryable<Player> query = Query(enableTracking, withDeleted);

    if (include != null)
    {
      query = include(query);
    }

    return await query
      .Where(p => p.IsActive)
      .OrderByDescending(p => p.Comments.Count)
      .Take(count)
      .ToListAsync(cancellationToken);
  }
}