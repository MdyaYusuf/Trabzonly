using Api.Core.Repositories;

namespace Api.Features.Squads;

public interface ISquadRepository : IRepository<Squad, Guid>
{
  Task<List<Squad>> GetRecentSquadsAsync(
    int count,
    DateTime? lastDateCursor = null,
    Guid? lastIdCursor = null,
    Func<IQueryable<Squad>, IQueryable<Squad>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<List<Squad>> GetTopRatedSquadsAsync(
    int count,
    Func<IQueryable<Squad>, IQueryable<Squad>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);
}
