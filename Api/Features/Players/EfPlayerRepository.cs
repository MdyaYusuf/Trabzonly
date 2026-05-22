using Api.Core.Repositories;
using Api.Data;

namespace Api.Features.Players;

public class EfPlayerRepository : EfBaseRepository<BaseDbContext, Player, Guid>, IPlayerRepository
{
  public EfPlayerRepository(BaseDbContext context) : base(context)
  {

  }
}