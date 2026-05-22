using Api.Core.Repositories;
using Api.Data;

namespace Api.Features.Stats;

public class EfPlayerStatsRepository : EfBaseRepository<BaseDbContext, PlayerStats, Guid>, IPlayerStatsRepository
{
  public EfPlayerStatsRepository(BaseDbContext context) : base(context)
  {

  }
}