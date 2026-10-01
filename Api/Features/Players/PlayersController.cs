using Api.Core.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Features.Players;

[ApiController]
[Route("api/players")]
public class PlayersController(IPlayerService _playerService) : CustomBaseController
{
  [HttpGet]
  public async Task<IActionResult> GetAll(
    [FromQuery] PlayerListQueryRequest query,
    CancellationToken cancellationToken = default)
  {
    var result = await _playerService.GetRosterAsync(
      query: query,
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("roster-overview")]
  public async Task<IActionResult> GetRosterOverview(
    CancellationToken cancellationToken = default)
  {
    var result = await _playerService.GetRosterOverviewAsync(cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("{id:int}")]
  public async Task<IActionResult> GetById(
    int id,
    CancellationToken cancellationToken)
  {
    var result = await _playerService.GetByIdAsync(
      id: id,
      currentUserId: TryGetUserId(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("top-valued/{count:int}")]
  public async Task<IActionResult> GetTopValuedPlayers(
    int count,
    [FromQuery] decimal? lastValue = null,
    [FromQuery] int? lastId = null,
    CancellationToken cancellationToken = default)
  {
    var result = await _playerService.GetTopValuedPlayersAsync(
      count: count,
      lastValueCursor: lastValue,
      lastIdCursor: lastId,
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("most-commented/{count:int}")]
  public async Task<IActionResult> GetMostCommentedPlayers(
    int count,
    CancellationToken cancellationToken)
  {
    var result = await _playerService.GetMostCommentedPlayersAsync(count: count, cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("top-rated/{count:int}")]
  public async Task<IActionResult> GetTopRatedPlayers(
    int count,
    CancellationToken cancellationToken)
  {
    var result = await _playerService.GetTopRatedPlayersAsync(count: count, cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpPost]
  public async Task<IActionResult> Add(
    [FromForm] CreatePlayerRequest request,
    CancellationToken cancellationToken)
  {
    var result = await _playerService.AddAsync(
      request: request,
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpPut]
  public async Task<IActionResult> Update(
    [FromForm] UpdatePlayerRequest request,
    CancellationToken cancellationToken)
  {
    var result = await _playerService.UpdateAsync(
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
    var result = await _playerService.RemoveAsync(
      id: id,
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize]
  [HttpPost("{id:int}/rate")]
  public async Task<IActionResult> Rate(
    int id,
    [FromBody] RatePlayerRequest request,
    CancellationToken cancellationToken)
  {
    var result = await _playerService.RateAsync(
      playerId: id,
      request: request,
      currentUserId: GetUserId(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }
}
