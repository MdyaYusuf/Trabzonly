using Api.Core.Repositories;

namespace Api.Features.Stats;

public interface IPlayerStatsRepository : IRepository<PlayerStats, Guid>
{
  Task<List<PlayerStats>> GetTopScorersAsync(
    int count,
    Func<IQueryable<PlayerStats>, IQueryable<PlayerStats>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<List<PlayerStats>> GetTopAssistersAsync(
    int count,
    Func<IQueryable<PlayerStats>, IQueryable<PlayerStats>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);
}