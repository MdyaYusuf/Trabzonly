using Api.Core.Repositories;
using Api.Data;

namespace Api.Features.Users;

public class EfUserFollowRepository : EfBaseRepository<BaseDbContext, UserFollow, Guid>, IUserFollowRepository
{
  public EfUserFollowRepository(BaseDbContext context) : base(context)
  {
  }
}
