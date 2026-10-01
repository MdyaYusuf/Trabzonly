using Api.Core.Repositories;

namespace Api.Features.Players;

public interface IPlayerRepository : IRepository<Player, int>
{
  Task<List<Player>> GetTopValuedPlayersAsync(
    int count,
    decimal? lastValueCursor = null,
    int? lastIdCursor = null,
    Func<IQueryable<Player>, IQueryable<Player>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<List<Player>> GetMostCommentedPlayersAsync(
    int count,
    Func<IQueryable<Player>, IQueryable<Player>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<List<Player>> GetTopRatedPlayersAsync(
    int count,
    Func<IQueryable<Player>, IQueryable<Player>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<PlayerRosterOverviewDto> GetRosterOverviewAsync(
    int? currentSeasonId = null,
    CancellationToken cancellationToken = default);
}
