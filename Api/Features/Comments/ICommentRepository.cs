using System.Linq.Expressions;
using Api.Core.Repositories;

namespace Api.Features.Comments;

public interface ICommentRepository : IRepository<Comment, Guid>
{
  Task<List<Comment>> GetRecentCommentsAsync(
    int count,
    Expression<Func<Comment, bool>>? filter = null,
    DateTime? lastDateCursor = null,
    Guid? lastIdCursor = null,
    Func<IQueryable<Comment>, IQueryable<Comment>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default
  );
}