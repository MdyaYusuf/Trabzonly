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
      .Where(p => p.IsActive && p.MarketValue.HasValue)
      .OrderByDescending(p => p.MarketValue)
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