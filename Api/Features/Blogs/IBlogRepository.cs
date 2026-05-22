using Api.Core.Repositories;

namespace Api.Features.Blogs;

public interface IBlogRepository : IRepository<Blog, Guid>
{

}