using Api.Core.Exceptions;
using Microsoft.EntityFrameworkCore;

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

  public async Task UserCannotExceedDailyCommentLimitAsync(
    Guid userId,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    if (userRole == "Admin") return;

    var today = DateTime.Today;
    var count = await _commentRepository
      .Query(enableTracking: false, withDeleted: false)
      .CountAsync(c => c.UserId == userId && c.CreatedDate >= today, cancellationToken);

    if (count >= 50)
    {
      throw new BusinessException("Günlük yorum ekleme sınırına ulaştınız (Maksimum 50). Lütfen yarın tekrar deneyin.");
    }
  }

  public async Task UserMustWaitBetweenCommentsAsync(
    Guid userId,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    if (userRole == "Admin") return;

    var oneMinuteAgo = DateTime.Now.AddMinutes(-1);
    bool postedRecently = await _commentRepository.AnyAsync(
      c => c.UserId == userId && c.CreatedDate >= oneMinuteAgo,
      cancellationToken);

    if (postedRecently)
    {
      throw new BusinessException("Çok sık yorum yapıyorsunuz. Lütfen yeni bir yorum eklemeden önce 1 dakika bekleyin.");
    }
  }

  public async Task CommentContentCannotBeDuplicatedByUserAsync(
    Guid userId,
    string content,
    CancellationToken cancellationToken = default)
  {
    var oneHourAgo = DateTime.Now.AddHours(-1);
    bool isDuplicate = await _commentRepository.AnyAsync(
      c => c.UserId == userId && c.Content == content && c.CreatedDate >= oneHourAgo,
      cancellationToken);

    if (isDuplicate)
    {
      throw new BusinessException("Aynı yorumu kısa süre içinde tekrar gönderemezsiniz.");
    }
  }
}