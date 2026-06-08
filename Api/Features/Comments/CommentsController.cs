using Api.Core.Controllers;
using Api.Core.Requests;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Features.Comments;

[ApiController]
[Route("api/comments")]
public class CommentsController(ICommentService _commentService) : CustomBaseController
{
  [HttpGet]
  public async Task<IActionResult> GetAll(
    [FromQuery] PaginationRequest pagination,
    CancellationToken cancellationToken = default)
  {
    var result = await _commentService.GetAllAsync(
      pageNumber: pagination.PageNumber,
      pageSize: pagination.PageSize,
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("recent")]
  public async Task<IActionResult> GetRecent(
    [FromQuery] int count = 10,
    [FromQuery] Guid? postId = null,
    [FromQuery] Guid? playerId = null,
    [FromQuery] DateTime? lastDate = null,
    [FromQuery] Guid? lastId = null,
    CancellationToken cancellationToken = default)
  {
    Expression<Func<Comment, bool>>? filter = null;

    if (postId.HasValue)
    {
      filter = c => c.PostId == postId;
    }
    else if (playerId.HasValue)
    {
      filter = c => c.PlayerId == playerId;
    }

    var result = await _commentService.GetRecentCommentsAsync(
      count: count,
      filter: filter,
      lastDateCursor: lastDate,
      lastIdCursor: lastId,
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("{id:guid}")]
  public async Task<IActionResult> GetById(
    Guid id,
    CancellationToken cancellationToken)
  {
    var result = await _commentService.GetByIdAsync(id: id, cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize]
  [HttpPost]
  public async Task<IActionResult> Add(
    [FromBody] CreateCommentRequest request,
    CancellationToken cancellationToken)
  {
    var result = await _commentService.AddAsync(
      request: request,
      currentUserId: GetUserId(),
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize]
  [HttpPut]
  public async Task<IActionResult> Update(
    [FromBody] UpdateCommentRequest request,
    CancellationToken cancellationToken)
  {
    var result = await _commentService.UpdateAsync(
      request: request,
      currentUserId: GetUserId(),
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize]
  [HttpDelete("{id:guid}")]
  public async Task<IActionResult> Delete(
    Guid id,
    CancellationToken cancellationToken)
  {
    var result = await _commentService.RemoveAsync(
      id: id,
      currentUserId: GetUserId(),
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }
}