using Api.Core.Repositories;
using Api.Data;
using Api.Features.Seasons;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Players;

public class EfPlayerRepository : EfBaseRepository<BaseDbContext, Player, int>, IPlayerRepository
{
  public EfPlayerRepository(BaseDbContext context) : base(context)
  {
  }

  public async Task<List<Player>> GetTopValuedPlayersAsync(
    int count,
    decimal? lastValueCursor = null,
    int? lastIdCursor = null,
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

  public async Task<List<Player>> GetTopRatedPlayersAsync(
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
      .Where(p => p.IsActive && p.RatingCount > 0)
      .OrderByDescending(p => p.AverageRating)
      .ThenByDescending(p => p.RatingCount)
      .ThenByDescending(p => p.Id)
      .Take(count)
      .ToListAsync(cancellationToken);
  }

  public async Task<PlayerRosterOverviewDto> GetRosterOverviewAsync(
    int? currentSeasonId = null,
    CancellationToken cancellationToken = default)
  {
    IQueryable<Player> query = Query(enableTracking: false)
      .Where(p => p.IsActive);

    bool hasPlayers = await query.AnyAsync(cancellationToken);

    decimal totalMarketValue = hasPlayers
      ? await query.SumAsync(p => p.MarketValue ?? 0m, cancellationToken)
      : 0m;

    int activePlayerCount = hasPlayers
      ? await query.CountAsync(cancellationToken)
      : 0;

    DateTime? lastUpdated = hasPlayers
      ? await query.MaxAsync(p => p.UpdatedDate ?? p.CreatedDate, cancellationToken)
      : null;

    string? currentSeasonName = null;

    if (currentSeasonId.HasValue)
    {
      currentSeasonName = await _context.Set<Season>()
        .AsNoTracking()
        .Where(s => s.Id == currentSeasonId.Value)
        .Select(s => s.Name)
        .FirstOrDefaultAsync(cancellationToken);
    }

    return new PlayerRosterOverviewDto(
      totalMarketValue,
      activePlayerCount,
      lastUpdated,
      currentSeasonName);
  }
}
