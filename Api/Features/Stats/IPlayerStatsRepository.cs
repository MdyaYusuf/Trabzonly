using Api.Core.Repositories;

namespace Api.Features.Stats;

public interface IPlayerStatsRepository : IRepository<PlayerStats, int>
{
  Task<List<PlayerStats>> GetTopScorersAsync(
    int count,
    int? lastValueCursor = null,
    int? lastIdCursor = null,
    Func<IQueryable<PlayerStats>, IQueryable<PlayerStats>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<List<PlayerStats>> GetTopAssistersAsync(
    int count,
    int? lastValueCursor = null,
    int? lastIdCursor = null,
    Func<IQueryable<PlayerStats>, IQueryable<PlayerStats>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);
}