using System.Linq.Expressions;
using Api.Core.Repositories;
using Api.Core.Responses;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.ContactMessages;

public class ContactMessageService(
  IContactMessageRepository _contactMessageRepository,
  ContactMessageBusinessRules _businessRules,
  IUnitOfWork _unitOfWork,
  IValidator<CreateContactMessageRequest> _createValidator) : IContactMessageService
{
  public async Task<ReturnModel<CreatedContactMessageResponseDto>> CreateAsync(
    CreateContactMessageRequest request,
    Guid currentUserId,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    var validationResult = await _createValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    await _businessRules.UserCannotExceedDailyMessageLimitAsync(
      currentUserId,
      userRole,
      cancellationToken);
    await _businessRules.UserMustWaitBetweenMessagesAsync(
      currentUserId,
      userRole,
      cancellationToken);

    var entity = new ContactMessage
    {
      Message = request.Message.Trim(),
      IsRead = false,
      IsResolved = false,
      UserId = currentUserId,
    };

    await _contactMessageRepository.AddAsync(entity, cancellationToken);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<CreatedContactMessageResponseDto>
    {
      Success = true,
      Message = "Mesajınız yöneticilere iletildi.",
      Data = new CreatedContactMessageResponseDto(entity.Id),
      StatusCode = 201,
    };
  }

  public async Task<ReturnModel<PagedResponse<ContactMessageAdminListItemDto>>> GetAdminListAsync(
    ContactMessageAdminListQueryRequest query,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    _businessRules.AdminRoleRequired(userRole);

    int pageNumber = query.PageNumber < 1 ? 1 : query.PageNumber;
    int pageSize = query.PageSize < 1 ? 10 : Math.Min(query.PageSize, 50);

    Expression<Func<ContactMessage, bool>> filter = BuildAdminListFilter(query);

    var (messages, totalCount) = await _contactMessageRepository.GetPagedListAsync(
      pageNumber,
      pageSize,
      filter,
      include: q => q.Include(m => m.User),
      orderBy: BuildAdminListOrderBy(query.Sort),
      enableTracking: false,
      cancellationToken: cancellationToken);

    List<ContactMessageAdminListItemDto> items = messages
      .Select(m => new ContactMessageAdminListItemDto(
        m.Id,
        m.Message,
        m.IsRead,
        m.IsResolved,
        m.CreatedDate,
        m.UserId,
        m.User.Username,
        m.User.Email))
      .ToList();

    var pagedResponse = new PagedResponse<ContactMessageAdminListItemDto>(
      items,
      totalCount,
      pageNumber,
      pageSize);

    return new ReturnModel<PagedResponse<ContactMessageAdminListItemDto>>
    {
      Success = true,
      Message = "İletişim mesajları başarılı bir şekilde getirildi.",
      Data = pagedResponse,
      StatusCode = 200,
    };
  }

  public async Task<ReturnModel<ContactMessageUnreadStatusDto>> GetUnreadStatusAsync(
    string userRole,
    CancellationToken cancellationToken = default)
  {
    _businessRules.AdminRoleRequired(userRole);

    bool hasUnread = await _contactMessageRepository.AnyAsync(
      m => !m.IsRead,
      cancellationToken);

    return new ReturnModel<ContactMessageUnreadStatusDto>
    {
      Success = true,
      Message = "Okunmamış mesaj durumu getirildi.",
      Data = new ContactMessageUnreadStatusDto(hasUnread),
      StatusCode = 200,
    };
  }

  public async Task<ReturnModel<NoData>> MarkAsReadAsync(
    int id,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    _businessRules.AdminRoleRequired(userRole);

    ContactMessage message = await _businessRules.GetContactMessageIfExistAsync(
      id,
      enableTracking: true,
      cancellationToken: cancellationToken);

    if (!message.IsRead)
    {
      message.IsRead = true;
      message.UpdatedDate = DateTime.Now;
      _contactMessageRepository.Update(message);
      await _unitOfWork.SaveChangesAsync(cancellationToken);
    }

    return new ReturnModel<NoData>
    {
      Success = true,
      Message = "Mesaj okundu olarak işaretlendi.",
      StatusCode = 200,
    };
  }

  public async Task<ReturnModel<NoData>> SetResolvedAsync(
    int id,
    SetContactMessageResolvedRequest request,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    _businessRules.AdminRoleRequired(userRole);

    ContactMessage message = await _businessRules.GetContactMessageIfExistAsync(
      id,
      enableTracking: true,
      cancellationToken: cancellationToken);

    if (message.IsResolved != request.IsResolved)
    {
      message.IsResolved = request.IsResolved;

      if (request.IsResolved)
      {
        message.IsRead = true;
      }

      message.UpdatedDate = DateTime.Now;
      _contactMessageRepository.Update(message);
      await _unitOfWork.SaveChangesAsync(cancellationToken);
    }

    return new ReturnModel<NoData>
    {
      Success = true,
      Message = request.IsResolved
        ? "Mesaj çözüldü olarak işaretlendi."
        : "Mesaj çözülmedi olarak işaretlendi.",
      StatusCode = 200,
    };
  }

  public async Task<ReturnModel<NoData>> RemoveAsync(
    int id,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    _businessRules.AdminRoleRequired(userRole);

    ContactMessage message = await _businessRules.GetContactMessageIfExistAsync(
      id,
      enableTracking: true,
      cancellationToken: cancellationToken);

    _contactMessageRepository.Delete(message);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>
    {
      Success = true,
      Message = "Mesaj başarılı bir şekilde silindi.",
      StatusCode = 200,
    };
  }

  private static Expression<Func<ContactMessage, bool>> BuildAdminListFilter(
    ContactMessageAdminListQueryRequest query)
  {
    string? search = query.Search?.Trim();
    bool? isRead = query.IsRead;
    bool? isResolved = query.IsResolved;

    return m =>
      (!isRead.HasValue || m.IsRead == isRead.Value) &&
      (!isResolved.HasValue || m.IsResolved == isResolved.Value) &&
      (string.IsNullOrEmpty(search) ||
       m.Message.Contains(search) ||
       m.User.Username.Contains(search) ||
       m.User.Email.Contains(search));
  }

  private static Func<IQueryable<ContactMessage>, IOrderedQueryable<ContactMessage>> BuildAdminListOrderBy(
    string? sort)
  {
    return sort switch
    {
      "created-asc" => q => q.OrderBy(m => m.CreatedDate),
      "username-asc" => q => q.OrderBy(m => m.User.Username).ThenByDescending(m => m.CreatedDate),
      _ => q => q.OrderByDescending(m => m.CreatedDate),
    };
  }
}
