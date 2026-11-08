using Api.Core.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Features.MatchWeek;

[ApiController]
[Route("api/match-weeks")]
public class MatchWeeksController(IMatchWeekService _matchWeekService) : CustomBaseController
{
  [HttpGet("current")]
  public async Task<IActionResult> GetCurrent(CancellationToken cancellationToken = default)
  {
    var result = await _matchWeekService.GetCurrentAsync(cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpPut("current")]
  public async Task<IActionResult> Save(
    [FromBody] SaveMatchWeekRequest request,
    CancellationToken cancellationToken = default)
  {
    var result = await _matchWeekService.SaveAsync(
      request: request,
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpPost("current/new-week")]
  public async Task<IActionResult> StartNewWeek(
    [FromBody] SaveMatchWeekRequest request,
    CancellationToken cancellationToken = default)
  {
    var result = await _matchWeekService.StartNewWeekAsync(
      request: request,
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }
}
