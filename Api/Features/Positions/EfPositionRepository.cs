using Api.Core.Repositories;
using Api.Data;

namespace Api.Features.Positions;

public class EfPositionRepository : EfBaseRepository<BaseDbContext, Position, Guid>, IPositionRepository
{
  public EfPositionRepository(BaseDbContext context) : base(context)
  {

  }
}