using Api.Core.Repositories;

namespace Api.Features.Players;

public interface IPlayerRepository : IRepository<Player, Guid>
{
  Task<List<Player>> GetTopValuedPlayersAsync(
    int count,
    decimal? lastValueCursor = null,
    Guid? lastIdCursor = null,
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
}