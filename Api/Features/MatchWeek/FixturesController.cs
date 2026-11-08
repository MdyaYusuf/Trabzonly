using Api.Core.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Features.MatchWeek;

[ApiController]
[Route("api/fixtures")]
public class FixturesController(IFixtureService _fixtureService) : CustomBaseController
{
  [HttpGet]
  public async Task<IActionResult> GetWeek(
    [FromQuery] int weekNumber,
    [FromQuery] int? seasonId = null,
    CancellationToken cancellationToken = default)
  {
    var result = await _fixtureService.GetWeekAsync(
      seasonId: seasonId,
      weekNumber: weekNumber,
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpPut]
  public async Task<IActionResult> Update(
    [FromBody] UpdateFixtureRequest request,
    CancellationToken cancellationToken = default)
  {
    var result = await _fixtureService.UpdateAsync(
      request: request,
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpPut("week")]
  public async Task<IActionResult> UpdateWeek(
    [FromBody] UpdateFixtureWeekRequest request,
    CancellationToken cancellationToken = default)
  {
    var result = await _fixtureService.UpdateWeekAsync(
      request: request,
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpPost("standings/rebuild")]
  public async Task<IActionResult> RebuildStandings(
    [FromQuery] int? seasonId = null,
    CancellationToken cancellationToken = default)
  {
    var result = await _fixtureService.RebuildStandingsAsync(
      seasonId: seasonId,
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }
}
