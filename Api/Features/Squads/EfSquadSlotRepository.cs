using Api.Core.Repositories;
using Api.Data;

namespace Api.Features.Squads;

public class EfSquadSlotRepository : EfBaseRepository<BaseDbContext, SquadSlot, Guid>, ISquadSlotRepository
{
  public EfSquadSlotRepository(BaseDbContext context) : base(context)
  {

  }
}
