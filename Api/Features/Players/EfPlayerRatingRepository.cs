using Api.Core.Repositories;
using Api.Data;

namespace Api.Features.Players;

public class EfPlayerRatingRepository : EfBaseRepository<BaseDbContext, PlayerRating, Guid>, IPlayerRatingRepository
{
  public EfPlayerRatingRepository(BaseDbContext context) : base(context)
  {
  }
}
