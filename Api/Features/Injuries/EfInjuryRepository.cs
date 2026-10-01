using Api.Core.Repositories;
using Api.Data;

namespace Api.Features.Injuries;

public class EfInjuryRepository : EfBaseRepository<BaseDbContext, Injury, int>, IInjuryRepository
{
  public EfInjuryRepository(BaseDbContext context) : base(context)
  {

  }
}