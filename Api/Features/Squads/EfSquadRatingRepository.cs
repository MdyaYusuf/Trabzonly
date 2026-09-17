using Api.Core.Repositories;
using Api.Data;

namespace Api.Features.Squads;

public class EfSquadRatingRepository : EfBaseRepository<BaseDbContext, SquadRating, Guid>, ISquadRatingRepository
{
  public EfSquadRatingRepository(BaseDbContext context) : base(context)
  {

  }
}
