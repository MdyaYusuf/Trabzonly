using Api.Core.Repositories;
using Api.Data;

namespace Api.Features.Comments;

public class EfCommentReactionRepository : EfBaseRepository<BaseDbContext, CommentReaction, Guid>, ICommentReactionRepository
{
  public EfCommentReactionRepository(BaseDbContext context) : base(context)
  {
  }
}
