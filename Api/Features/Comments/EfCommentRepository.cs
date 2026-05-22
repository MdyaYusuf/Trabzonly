using Api.Core.Repositories;
using Api.Data;

namespace Api.Features.Comments;

public class EfCommentRepository : EfBaseRepository<BaseDbContext, Comment, Guid>, ICommentRepository
{
  public EfCommentRepository(BaseDbContext context) : base(context)
  {

  }
}