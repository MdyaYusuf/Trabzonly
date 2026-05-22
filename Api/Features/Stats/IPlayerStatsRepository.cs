using Api.Core.Repositories;

namespace Api.Features.Stats;

public interface IPlayerStatsRepository : IRepository<PlayerStats, Guid>
{

}