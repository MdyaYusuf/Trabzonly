using Api.Core.Repositories;
using Api.Data;

namespace Api.Features.Blogs;

public class EfBlogRepository : EfBaseRepository<BaseDbContext, Blog, Guid>, IBlogRepository
{
  public EfBlogRepository(BaseDbContext context) : base(context)
  {
  }
}