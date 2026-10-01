using Api.Core.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Features.Polls;

[ApiController]
[Route("api/polls")]
public class PollsController(IPollService _pollService) : CustomBaseController
{
  [HttpGet("active/by-player/{playerId:int}")]
  public async Task<IActionResult> GetActiveByPlayer(
    int playerId,
    CancellationToken cancellationToken = default)
  {
    var result = await _pollService.GetActiveAsync(
      playerId: playerId,
      currentUserId: TryGetUserId(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("active/global")]
  public async Task<IActionResult> GetActiveGlobal(
    CancellationToken cancellationToken = default)
  {
    var result = await _pollService.GetActiveAsync(
      playerId: null,
      currentUserId: TryGetUserId(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpPost]
  public async Task<IActionResult> Add(
    [FromBody] CreatePollRequest request,
    CancellationToken cancellationToken = default)
  {
    var result = await _pollService.AddAsync(
      request: request,
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpPut]
  public async Task<IActionResult> Update(
    [FromBody] UpdatePollRequest request,
    CancellationToken cancellationToken = default)
  {
    var result = await _pollService.UpdateAsync(
      request: request,
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize]
  [HttpPost("{id:int}/vote")]
  public async Task<IActionResult> Vote(
    int id,
    [FromBody] VotePollRequest request,
    CancellationToken cancellationToken = default)
  {
    var result = await _pollService.VoteAsync(
      pollId: id,
      request: request,
      currentUserId: GetUserId(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }
}
