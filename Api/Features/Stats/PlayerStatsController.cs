using Api.Core.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Features.Stats;

[ApiController]
[Route("api/player-stats")]
public class PlayerStatsController(IPlayerStatsService _playerStatsService) : CustomBaseController
{
  [HttpGet]
  public async Task<IActionResult> GetAll(
    CancellationToken cancellationToken)
  {
    var result = await _playerStatsService.GetAllAsync(cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("{id:guid}")]
  public async Task<IActionResult> GetById(
    Guid id,
    CancellationToken cancellationToken)
  {
    var result = await _playerStatsService.GetByIdAsync(id: id, cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("top-scorers/{count:int}")]
  public async Task<IActionResult> GetTopScorers(
    int count,
    CancellationToken cancellationToken)
  {
    var result = await _playerStatsService.GetTopScorersAsync(count: count, cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("top-assisters/{count:int}")]
  public async Task<IActionResult> GetTopAssisters(
    int count,
    CancellationToken cancellationToken)
  {
    var result = await _playerStatsService.GetTopAssistersAsync(count: count, cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpPost]
  public async Task<IActionResult> Add(
    [FromBody] CreatePlayerStatsRequest request,
    CancellationToken cancellationToken)
  {
    var result = await _playerStatsService.AddAsync(
      request: request,
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpPut]
  public async Task<IActionResult> Update(
    [FromBody] UpdatePlayerStatsRequest request,
    CancellationToken cancellationToken)
  {
    var result = await _playerStatsService.UpdateAsync(
      request: request,
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpDelete("{id:guid}")]
  public async Task<IActionResult> Delete(
    Guid id,
    CancellationToken cancellationToken)
  {
    var result = await _playerStatsService.RemoveAsync(
      id: id,
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }
}