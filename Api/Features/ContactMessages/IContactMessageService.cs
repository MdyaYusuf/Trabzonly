using Api.Core.Responses;

namespace Api.Features.ContactMessages;

public interface IContactMessageService
{
  Task<ReturnModel<CreatedContactMessageResponseDto>> CreateAsync(
    CreateContactMessageRequest request,
    Guid currentUserId,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<PagedResponse<ContactMessageAdminListItemDto>>> GetAdminListAsync(
    ContactMessageAdminListQueryRequest query,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<ContactMessageUnreadStatusDto>> GetUnreadStatusAsync(
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> MarkAsReadAsync(
    int id,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> SetResolvedAsync(
    int id,
    SetContactMessageResolvedRequest request,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> RemoveAsync(
    int id,
    string userRole,
    CancellationToken cancellationToken = default);
}
