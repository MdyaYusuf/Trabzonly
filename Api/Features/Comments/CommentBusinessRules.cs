using Api.Core.Exceptions;

namespace Api.Features.Comments;

public class CommentBusinessRules(ICommentRepository _commentRepository)
{
  public async Task<Comment> GetCommentIfExistAsync(
    Guid id,
    Func<IQueryable<Comment>, IQueryable<Comment>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    var comment = await _commentRepository.GetByIdAsync(id, include, enableTracking, cancellationToken);

    if (comment == null)
    {
      throw new NotFoundException($"{id} numaralı yorum bulunamadı.");
    }

    return comment;
  }

  public void UserMustBeOwnerOrAdmin(Guid commentUserId, Guid currentUserId, string userRole)
  {
    if (commentUserId != currentUserId && userRole != "Admin")
    {
      throw new ForbiddenException("Bu işlem için yetkiniz bulunmamaktadır.");
    }
  }
}