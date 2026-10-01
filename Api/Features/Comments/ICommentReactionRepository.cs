using Api.Core.Repositories;

namespace Api.Features.Comments;

public interface ICommentReactionRepository : IRepository<CommentReaction, Guid>
{
}
