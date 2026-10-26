using Api.Core.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Features.Quizzes;

[ApiController]
[Route("api/quizzes")]
public class QuizzesController(IQuizService _quizService) : CustomBaseController
{
  [HttpGet]
  public async Task<IActionResult> GetActiveList(
    [FromQuery] QuizCategory? category = null,
    [FromQuery] string? sort = "most-taken",
    CancellationToken cancellationToken = default)
  {
    var result = await _quizService.GetActiveListAsync(
      category: category,
      sort: sort,
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("stats/platform")]
  public async Task<IActionResult> GetPlatformStats(
    CancellationToken cancellationToken)
  {
    var result = await _quizService.GetPlatformStatsAsync(cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize]
  [HttpGet("stats/me")]
  public async Task<IActionResult> GetMyStats(
    CancellationToken cancellationToken)
  {
    var result = await _quizService.GetMyStatsAsync(
      currentUserId: GetUserId(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("leaderboard")]
  public async Task<IActionResult> GetLeaderboard(
    [FromQuery] int take = QuizBusinessRules.DefaultLeaderboardTake,
    CancellationToken cancellationToken = default)
  {
    var result = await _quizService.GetLeaderboardAsync(
      take: take,
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpGet("manage")]
  public async Task<IActionResult> GetAllForAdmin(
    CancellationToken cancellationToken)
  {
    var result = await _quizService.GetAllAsync(cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("most-taken/{count:int}")]
  public async Task<IActionResult> GetMostTakenQuizzes(
    int count,
    CancellationToken cancellationToken)
  {
    var result = await _quizService.GetMostTakenQuizzesAsync(
      count: count,
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("recent/{count:int}")]
  public async Task<IActionResult> GetRecentQuizzes(
    int count,
    [FromQuery] DateTime? lastDate = null,
    [FromQuery] Guid? lastId = null,
    CancellationToken cancellationToken = default)
  {
    var result = await _quizService.GetRecentQuizzesAsync(
      count: count,
      lastDateCursor: lastDate,
      lastIdCursor: lastId,
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize]
  [HttpGet("{id:guid}/take")]
  public async Task<IActionResult> GetTake(
    Guid id,
    CancellationToken cancellationToken)
  {
    var result = await _quizService.GetTakeAsync(
      id: id,
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpGet("{id:guid}")]
  public async Task<IActionResult> GetById(
    Guid id,
    CancellationToken cancellationToken)
  {
    var result = await _quizService.GetByIdAsync(id: id, cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpPost]
  public async Task<IActionResult> Add(
    [FromBody] CreateQuizRequest request,
    CancellationToken cancellationToken)
  {
    var result = await _quizService.AddAsync(
      request: request,
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpPut]
  public async Task<IActionResult> Update(
    [FromBody] UpdateQuizRequest request,
    CancellationToken cancellationToken)
  {
    var result = await _quizService.UpdateAsync(
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
    var result = await _quizService.RemoveAsync(
      id: id,
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize]
  [HttpPost("check-answer")]
  public async Task<IActionResult> CheckAnswer(
    [FromBody] CheckQuizAnswerRequest request,
    CancellationToken cancellationToken)
  {
    var result = await _quizService.CheckAnswerAsync(
      request: request,
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize]
  [HttpPost("submit")]
  public async Task<IActionResult> Submit(
    [FromBody] SubmitQuizRequest request,
    CancellationToken cancellationToken)
  {
    var result = await _quizService.SubmitQuizAsync(
      request: request,
      currentUserId: GetUserId(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }
}
