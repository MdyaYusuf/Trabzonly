using Api.Core.Controllers;
using Api.Core.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Features.Seasons;

[ApiController]
[Route("api/seasons")]
public class SeasonsController(ISeasonService _seasonService) : CustomBaseController
{
  [HttpGet]
  public async Task<IActionResult> GetAll(
    [FromQuery] PaginationRequest pagination,
    CancellationToken cancellationToken = default)
  {
    var result = await _seasonService.GetAllAsync(
      pageNumber: pagination.PageNumber,
      pageSize: pagination.PageSize,
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpGet("manage")]
  public async Task<IActionResult> GetAllForAdmin(
    [FromQuery] SeasonAdminListQueryRequest query,
    CancellationToken cancellationToken = default)
  {
    var result = await _seasonService.GetAdminListAsync(
      query: query,
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpGet("manage/summary")]
  public async Task<IActionResult> GetAdminSummary(
    CancellationToken cancellationToken = default)
  {
    var result = await _seasonService.GetAdminSummaryAsync(cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("active")]
  public async Task<IActionResult> GetActive(CancellationToken cancellationToken = default)
  {
    var result = await _seasonService.GetActiveAsync(cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("{id:int}")]
  public async Task<IActionResult> GetById(
    int id,
    CancellationToken cancellationToken)
  {
    var result = await _seasonService.GetByIdAsync(id: id, cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpPost]
  public async Task<IActionResult> Add(
    [FromBody] CreateSeasonRequest request,
    CancellationToken cancellationToken)
  {
    var result = await _seasonService.AddAsync(
      request: request,
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpPut]
  public async Task<IActionResult> Update(
    [FromBody] UpdateSeasonRequest request,
    CancellationToken cancellationToken)
  {
    var result = await _seasonService.UpdateAsync(
      request: request,
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpPut("displayed-fixture-week")]
  public async Task<IActionResult> UpdateDisplayedFixtureWeek(
    [FromBody] UpdateDisplayedFixtureWeekRequest request,
    CancellationToken cancellationToken = default)
  {
    var result = await _seasonService.UpdateDisplayedFixtureWeekAsync(
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
    var result = await _seasonService.RemoveAsync(
      id: id,
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }
}
