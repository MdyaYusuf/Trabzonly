using Api.Core.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.ContactMessages;

public class ContactMessageBusinessRules(IContactMessageRepository _contactMessageRepository)
{
  public const int DailyLimit = 3;
  public static readonly TimeSpan SendCooldown = TimeSpan.FromHours(1);

  public async Task<ContactMessage> GetContactMessageIfExistAsync(
    int id,
    Func<IQueryable<ContactMessage>, IQueryable<ContactMessage>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    ContactMessage? message = await _contactMessageRepository.GetByIdAsync(
      id,
      include,
      enableTracking,
      cancellationToken);

    if (message == null)
    {
      throw new NotFoundException($"{id} numaralı mesaj bulunamadı.");
    }

    return message;
  }

  public void AdminRoleRequired(string userRole)
  {
    if (userRole != "Admin")
    {
      throw new ForbiddenException("İletişim mesajı işlemleri için yetkiniz bulunmamaktadır.");
    }
  }

  public async Task UserMustWaitBetweenMessagesAsync(
    Guid userId,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    if (userRole == "Admin")
    {
      return;
    }

    DateTime cooldownStart = DateTime.Now.Subtract(SendCooldown);
    bool sentRecently = await _contactMessageRepository.AnyAsync(
      m => m.UserId == userId && m.CreatedDate >= cooldownStart,
      cancellationToken);

    if (sentRecently)
    {
      throw new BusinessException(
        "Yeni bir mesaj göndermeden önce 1 saat beklemelisiniz.");
    }
  }

  public async Task UserCannotExceedDailyMessageLimitAsync(
    Guid userId,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    if (userRole == "Admin")
    {
      return;
    }

    DateTime today = DateTime.Today;
    int count = await _contactMessageRepository
      .Query(enableTracking: false)
      .CountAsync(m => m.UserId == userId && m.CreatedDate >= today, cancellationToken);

    if (count >= DailyLimit)
    {
      throw new BusinessException(
        "Günlük mesaj gönderme sınırına ulaştınız (Maksimum 3). Lütfen yarın tekrar deneyin.");
    }
  }
}
