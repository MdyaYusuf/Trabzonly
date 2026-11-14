using Api.Core.Controllers;
using Api.Core.Requests;
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
      currentUserId: TryGetUserId(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("recent")]
  public async Task<IActionResult> GetRecent(
    [FromQuery] CommentRecentQueryRequest query,
    CancellationToken cancellationToken = default)
  {
    var result = await _commentService.GetRecentCommentsAsync(
      query: query,
      currentUserId: TryGetUserId(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("{id:guid}")]
  public async Task<IActionResult> GetById(
    Guid id,
    CancellationToken cancellationToken)
  {
    var result = await _commentService.GetByIdAsync(
      id: id,
      currentUserId: TryGetUserId(),
      cancellationToken: cancellationToken);

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

  [Authorize]
  [HttpPost("{id:guid}/like")]
  public async Task<IActionResult> Like(
    Guid id,
    CancellationToken cancellationToken)
  {
    var result = await _commentService.ReactAsync(
      commentId: id,
      currentUserId: GetUserId(),
      reactionType: CommentReactionType.Like,
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize]
  [HttpPost("{id:guid}/dislike")]
  public async Task<IActionResult> Dislike(
    Guid id,
    CancellationToken cancellationToken)
  {
    var result = await _commentService.ReactAsync(
      commentId: id,
      currentUserId: GetUserId(),
      reactionType: CommentReactionType.Dislike,
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }
}
