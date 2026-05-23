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
    CancellationToken cancellationToken)
  {
    var result = await _playerService.GetAllAsync(cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("{id:guid}")]
  public async Task<IActionResult> GetById(
    Guid id,
    CancellationToken cancellationToken)
  {
    var result = await _playerService.GetByIdAsync(id: id, cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("top-valued/{count:int}")]
  public async Task<IActionResult> GetTopValuedPlayers(
    int count,
    CancellationToken cancellationToken)
  {
    var result = await _playerService.GetTopValuedPlayersAsync(count: count, cancellationToken: cancellationToken);

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
  [HttpDelete("{id:guid}")]
  public async Task<IActionResult> Delete(
    Guid id,
    CancellationToken cancellationToken)
  {
    var result = await _playerService.RemoveAsync(
      id: id,
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }
}