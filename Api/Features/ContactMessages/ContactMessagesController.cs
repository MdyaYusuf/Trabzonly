using Api.Core.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Features.ContactMessages;

[ApiController]
[Route("api/contact-messages")]
public class ContactMessagesController(IContactMessageService _contactMessageService) : CustomBaseController
{
  [Authorize]
  [HttpPost]
  public async Task<IActionResult> Create(
    [FromBody] CreateContactMessageRequest request,
    CancellationToken cancellationToken)
  {
    var result = await _contactMessageService.CreateAsync(
      request: request,
      currentUserId: GetUserId(),
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpGet]
  public async Task<IActionResult> GetAdminList(
    [FromQuery] ContactMessageAdminListQueryRequest query,
    CancellationToken cancellationToken = default)
  {
    var result = await _contactMessageService.GetAdminListAsync(
      query: query,
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpGet("has-unread")]
  public async Task<IActionResult> GetUnreadStatus(
    CancellationToken cancellationToken = default)
  {
    var result = await _contactMessageService.GetUnreadStatusAsync(
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpPatch("{id:int}/read")]
  public async Task<IActionResult> MarkAsRead(
    int id,
    CancellationToken cancellationToken)
  {
    var result = await _contactMessageService.MarkAsReadAsync(
      id: id,
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpPatch("{id:int}/resolved")]
  public async Task<IActionResult> SetResolved(
    int id,
    [FromBody] SetContactMessageResolvedRequest request,
    CancellationToken cancellationToken)
  {
    var result = await _contactMessageService.SetResolvedAsync(
      id: id,
      request: request,
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpDelete("{id:int}")]
  public async Task<IActionResult> Delete(
    int id,
    CancellationToken cancellationToken)
  {
    var result = await _contactMessageService.RemoveAsync(
      id: id,
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }
}
