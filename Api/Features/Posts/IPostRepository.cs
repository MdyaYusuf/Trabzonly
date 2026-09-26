using Api.Core.Repositories;

namespace Api.Features.Posts;

public interface IPostRepository : IRepository<Post, Guid>
{
}
