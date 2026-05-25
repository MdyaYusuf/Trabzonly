using Api.Core.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Blogs;

public class BlogBusinessRules(IBlogRepository _blogRepository)
{
  public async Task<Blog> GetBlogIfExistAsync(
    Guid id,
    Func<IQueryable<Blog>, IQueryable<Blog>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    var blog = await _blogRepository.GetByIdAsync(id, include, enableTracking, cancellationToken);

    if (blog == null)
    {
      throw new NotFoundException($"{id} numaralı blog bulunamadı.");
    }

    return blog;
  }

  public void UserMustBeOwnerOrAdmin(
    Guid blogUserId,
    Guid currentUserId,
    string userRole)
  {
    if (blogUserId != currentUserId && userRole != "Admin")
    {
      throw new ForbiddenException("Bu işlem için yetkiniz bulunmamaktadır.");
    }
  }

  public async Task BlogTitleMustBeUniqueAsync(
    string title,
    CancellationToken cancellationToken = default)
  {
    bool exists = await _blogRepository.AnyAsync(b => b.Title == title, cancellationToken);

    if (exists)
    {
      throw new BusinessException("Bu başlığa sahip bir blog zaten mevcut. Lütfen farklı bir başlık seçiniz.");
    }
  }

  public async Task BlogTitleCannotBeDuplicatedWhenUpdated(
    Guid id,
    string title,
    CancellationToken cancellationToken = default)
  {
    bool exists = await _blogRepository.AnyAsync(b => b.Id != id && b.Title == title, cancellationToken);

    if (exists)
    {
      throw new BusinessException("Bu başlığa sahip bir blog zaten mevcut. Lütfen farklı bir başlık seçiniz.");
    }
  }

  public async Task UserCannotExceedDailyBlogLimitAsync(
    Guid userId,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    if (userRole == "Admin")
    {
      return;
    }

    var today = DateTime.Today;
    var userBlogsTodayCount = await _blogRepository
      .Query(enableTracking: false, withDeleted: false)
      .CountAsync(b => b.UserId == userId && b.CreatedDate >= today, cancellationToken);

    if (userBlogsTodayCount >= 5)
    {
      throw new BusinessException("Günlük blog ekleme sınırına ulaştınız (Maksimum 5). Lütfen yarın tekrar deneyin.");
    }
  }

  public async Task UserMustWaitBetweenBlogPostsAsync(
    Guid userId,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    if (userRole == "Admin")
    {
      return;
    }

    var fiveMinutesAgo = DateTime.Now.AddMinutes(-5);
    bool postedRecently = await _blogRepository.AnyAsync(
      b => b.UserId == userId && b.CreatedDate >= fiveMinutesAgo,
      cancellationToken);

    if (postedRecently)
    {
      throw new BusinessException("Çok sık blog ekliyorsunuz. Lütfen yeni bir blog eklemeden önce en az 5 dakika bekleyin.");
    }
  }
}