using Api.Core.Repositories;
using Api.Data;

namespace Api.Features.Seasons;

public class EfSeasonRepository : EfBaseRepository<BaseDbContext, Season, int>, ISeasonRepository
{
  public EfSeasonRepository(BaseDbContext context) : base(context)
  {

  }
}