using Api.Core.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Posts;

public class PostBusinessRules(IPostRepository _postRepository)
{
  public async Task<Post> GetPostIfExistAsync(
    Guid id,
    Func<IQueryable<Post>, IQueryable<Post>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    var post = await _postRepository.GetByIdAsync(id, include, enableTracking, cancellationToken);

    if (post == null)
    {
      throw new NotFoundException($"{id} numaralı post bulunamadı.");
    }

    return post;
  }

  public void UserMustBeOwnerOrAdmin(
    Guid postUserId,
    Guid currentUserId,
    string userRole)
  {
    if (postUserId != currentUserId && userRole != "Admin")
    {
      throw new ForbiddenException("Bu işlem için yetkiniz bulunmamaktadır.");
    }
  }

  public async Task PostTitleMustBeUniqueAsync(
    string title,
    CancellationToken cancellationToken = default)
  {
    bool exists = await _postRepository.AnyAsync(p => p.Title == title, cancellationToken);

    if (exists)
    {
      throw new BusinessException("Bu başlığa sahip bir post zaten mevcut. Lütfen farklı bir başlık seçiniz.");
    }
  }

  public async Task PostTitleCannotBeDuplicatedWhenUpdated(
    Guid id,
    string title,
    CancellationToken cancellationToken = default)
  {
    bool exists = await _postRepository.AnyAsync(p => p.Id != id && p.Title == title, cancellationToken);

    if (exists)
    {
      throw new BusinessException("Bu başlığa sahip bir post zaten mevcut. Lütfen farklı bir başlık seçiniz.");
    }
  }

  public async Task UserCannotExceedDailyPostLimitAsync(
    Guid userId,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    if (userRole == "Admin")
    {
      return;
    }

    var today = DateTime.Today;
    var userPostsTodayCount = await _postRepository
      .Query(enableTracking: false, withDeleted: false)
      .CountAsync(p => p.UserId == userId && p.CreatedDate >= today, cancellationToken);

    if (userPostsTodayCount >= 5)
    {
      throw new BusinessException("Günlük post ekleme sınırına ulaştınız (Maksimum 5). Lütfen yarın tekrar deneyin.");
    }
  }

  public async Task UserMustWaitBetweenPostsAsync(
    Guid userId,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    if (userRole == "Admin")
    {
      return;
    }

    var fiveMinutesAgo = DateTime.Now.AddMinutes(-5);
    bool postedRecently = await _postRepository.AnyAsync(
      p => p.UserId == userId && p.CreatedDate >= fiveMinutesAgo,
      cancellationToken);

    if (postedRecently)
    {
      throw new BusinessException("Çok sık post ekliyorsunuz. Lütfen yeni bir post eklemeden önce en az 5 dakika bekleyin.");
    }
  }
}