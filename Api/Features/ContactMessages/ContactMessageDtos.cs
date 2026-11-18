namespace Api.Features.ContactMessages;

public sealed record ContactMessageAdminListItemDto(
  int Id,
  string Message,
  bool IsRead,
  bool IsResolved,
  DateTime CreatedDate,
  Guid UserId,
  string Username,
  string Email);

public sealed record ContactMessageUnreadStatusDto(bool HasUnread);

public sealed record CreatedContactMessageResponseDto(int Id);

public sealed record CreateContactMessageRequest(string Message);

public sealed record SetContactMessageResolvedRequest(bool IsResolved);

public sealed record ContactMessageAdminListQueryRequest(
  int PageNumber = 1,
  int PageSize = 10,
  string? Search = null,
  bool? IsRead = null,
  bool? IsResolved = null,
  string? Sort = null);
