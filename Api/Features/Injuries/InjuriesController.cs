using Api.Core.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Features.Injuries;

[ApiController]
[Route("api/injuries")]
public class InjuriesController(IInjuryService _injuryService) : CustomBaseController
{
  [HttpGet]
  public async Task<IActionResult> GetAll(
    [FromQuery] InjuryListQueryRequest query,
    CancellationToken cancellationToken = default)
  {
    var result = await _injuryService.GetListAsync(
      query: query,
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpGet("manage")]
  public async Task<IActionResult> GetAllForAdmin(
    [FromQuery] InjuryAdminListQueryRequest query,
    CancellationToken cancellationToken = default)
  {
    var result = await _injuryService.GetAdminListAsync(
      query: query,
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("{id:int}")]
  public async Task<IActionResult> GetById(
    int id,
    CancellationToken cancellationToken)
  {
    var result = await _injuryService.GetByIdAsync(id: id, cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpPost]
  public async Task<IActionResult> Add(
    [FromBody] CreateInjuryRequest request,
    CancellationToken cancellationToken)
  {
    var result = await _injuryService.AddAsync(
      request: request,
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpPut]
  public async Task<IActionResult> Update(
    [FromBody] UpdateInjuryRequest request,
    CancellationToken cancellationToken)
  {
    var result = await _injuryService.UpdateAsync(
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
    var result = await _injuryService.RemoveAsync(
      id: id,
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }
}
