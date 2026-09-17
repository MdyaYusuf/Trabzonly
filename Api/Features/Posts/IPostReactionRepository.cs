using Api.Core.Repositories;

namespace Api.Features.Posts;

public interface IPostReactionRepository : IRepository<PostReaction, Guid>
{
}
