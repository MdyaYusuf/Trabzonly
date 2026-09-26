using Api.Core.Repositories;
using Api.Data;

namespace Api.Features.Users;

public class EfUserRepository : EfBaseRepository<BaseDbContext, User, Guid>, IUserRepository
{
  public EfUserRepository(BaseDbContext context) : base(context)
  {
  }
}
