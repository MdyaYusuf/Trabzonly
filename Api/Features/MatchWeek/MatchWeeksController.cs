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
    var result = await _matchWeekService.GetCurrentAsync(
      currentUserId: TryGetUserId(),
      cancellationToken: cancellationToken);

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

  [Authorize]
  [HttpPut("current/players/{playerId:int}/rating")]
  public async Task<IActionResult> RatePlayer(
    int playerId,
    [FromBody] RateMatchWeekPlayerRequest request,
    CancellationToken cancellationToken = default)
  {
    var result = await _matchWeekService.RatePlayerAsync(
      playerId: playerId,
      request: request,
      currentUserId: GetUserId(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("current/leaderboard")]
  public async Task<IActionResult> GetLeaderboard(CancellationToken cancellationToken = default)
  {
    var result = await _matchWeekService.GetLeaderboardAsync(cancellationToken);

    return CreateActionResult(result);
  }
}
