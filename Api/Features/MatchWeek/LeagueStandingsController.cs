using Api.Core.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace Api.Features.MatchWeek;

[ApiController]
[Route("api/league-standings")]
public class LeagueStandingsController(
  ILeagueStandingService _leagueStandingService) : CustomBaseController
{
  [HttpGet]
  public async Task<IActionResult> GetBySeason(
    [FromQuery] int? seasonId = null,
    CancellationToken cancellationToken = default)
  {
    var result = await _leagueStandingService.GetBySeasonAsync(
      seasonId: seasonId,
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }
}
