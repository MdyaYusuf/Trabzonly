using Api.Core.Repositories;
using Api.Data;

namespace Api.Features.Posts;

public class EfPostReactionRepository : EfBaseRepository<BaseDbContext, PostReaction, Guid>, IPostReactionRepository
{
  public EfPostReactionRepository(BaseDbContext context) : base(context)
  {

  }
}
