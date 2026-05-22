using Api.Core.Repositories;

namespace Api.Features.Comments;

public interface ICommentRepository : IRepository<Comment, Guid>
{

}