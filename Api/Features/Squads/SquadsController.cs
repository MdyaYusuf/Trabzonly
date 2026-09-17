using Api.Core.Controllers;
using Api.Core.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Features.Squads;

[ApiController]
[Route("api/squads")]
public class SquadsController(ISquadService _squadService) : CustomBaseController
{
  [HttpGet]
  public async Task<IActionResult> GetAll(
    [FromQuery] PaginationRequest pagination,
    CancellationToken cancellationToken = default)
  {
    var result = await _squadService.GetAllAsync(
      pageNumber: pagination.PageNumber,
      pageSize: pagination.PageSize,
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("recent/{count:int}")]
  public async Task<IActionResult> GetRecentSquads(
    int count,
    [FromQuery] DateTime? lastDate = null,
    [FromQuery] Guid? lastId = null,
    CancellationToken cancellationToken = default)
  {
    var result = await _squadService.GetRecentSquadsAsync(
      count: count,
      lastDateCursor: lastDate,
      lastIdCursor: lastId,
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("top-rated/{count:int}")]
  public async Task<IActionResult> GetTopRatedSquads(
    int count,
    CancellationToken cancellationToken)
  {
    var result = await _squadService.GetTopRatedSquadsAsync(
      count: count,
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("user/{userId:guid}")]
  public async Task<IActionResult> GetByUserId(
    Guid userId,
    CancellationToken cancellationToken)
  {
    var result = await _squadService.GetByUserIdAsync(
      userId: userId,
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("{id:guid}")]
  public async Task<IActionResult> GetById(
    Guid id,
    CancellationToken cancellationToken)
  {
    var result = await _squadService.GetByIdAsync(
      id: id,
      currentUserId: TryGetUserId(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize]
  [HttpPost]
  public async Task<IActionResult> Add(
    [FromBody] CreateSquadRequest request,
    CancellationToken cancellationToken)
  {
    var result = await _squadService.AddAsync(
      request: request,
      currentUserId: GetUserId(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize]
  [HttpPut]
  public async Task<IActionResult> Update(
    [FromBody] UpdateSquadRequest request,
    CancellationToken cancellationToken)
  {
    var result = await _squadService.UpdateAsync(
      request: request,
      currentUserId: GetUserId(),
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize]
  [HttpDelete("{id:guid}")]
  public async Task<IActionResult> Delete(
    Guid id,
    CancellationToken cancellationToken)
  {
    var result = await _squadService.RemoveAsync(
      id: id,
      currentUserId: GetUserId(),
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize]
  [HttpPost("{id:guid}/rate")]
  public async Task<IActionResult> Rate(
    Guid id,
    [FromBody] RateSquadRequest request,
    CancellationToken cancellationToken)
  {
    var result = await _squadService.RateAsync(
      squadId: id,
      request: request,
      currentUserId: GetUserId(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }
}
