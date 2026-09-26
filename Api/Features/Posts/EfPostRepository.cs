using Api.Core.Repositories;
using Api.Data;

namespace Api.Features.Posts;

public class EfPostRepository : EfBaseRepository<BaseDbContext, Post, Guid>, IPostRepository
{
  public EfPostRepository(BaseDbContext context) : base(context)
  {
  }
}
