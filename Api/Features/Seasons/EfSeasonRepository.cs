using Api.Core.Repositories;
using Api.Data;

namespace Api.Features.Seasons;

public class EfSeasonRepository : EfBaseRepository<BaseDbContext, Season, Guid>, ISeasonRepository
{
  public EfSeasonRepository(BaseDbContext context) : base(context)
  {

  }
}