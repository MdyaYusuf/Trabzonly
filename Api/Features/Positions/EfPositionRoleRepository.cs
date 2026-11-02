using Api.Core.Repositories;
using Api.Data;

namespace Api.Features.Positions;

public class EfPositionRoleRepository : EfBaseRepository<BaseDbContext, PositionRole, int>, IPositionRoleRepository
{
  public EfPositionRoleRepository(BaseDbContext context) : base(context)
  {
  }
}
