using Api.Core.Controllers;
using Api.Core.Requests;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
    [FromQuery] int count = 10,
    [FromQuery] Guid? postId = null,
    [FromQuery] int? playerId = null,
    [FromQuery] string sort = "newest",
    [FromQuery] DateTime? lastDate = null,
    [FromQuery] Guid? lastId = null,
    CancellationToken cancellationToken = default)
  {
    Expression<Func<Comment, bool>>? filter = null;
    Func<IQueryable<Comment>, IQueryable<Comment>>? include = null;

    if (postId.HasValue)
    {
      Guid resolvedPostId = postId.Value;
      filter = c => c.PostId == resolvedPostId && c.ParentCommentId == null;
      include = query => query
        .Include(c => c.User)
        .Include(c => c.Replies)
        .ThenInclude(r => r.User);
    }
    else if (playerId.HasValue)
    {
      int resolvedPlayerId = playerId.Value;
      filter = c => c.PlayerId == resolvedPlayerId && c.ParentCommentId == null;
      include = query => query
        .Include(c => c.User)
        .Include(c => c.Replies)
        .ThenInclude(r => r.User);
    }

    Func<IQueryable<Comment>, IOrderedQueryable<Comment>>? orderBy = null;

    if (string.Equals(sort, "liked", StringComparison.OrdinalIgnoreCase))
    {
      orderBy = query => query
        .OrderByDescending(c => c.LikeCount)
        .ThenByDescending(c => c.CreatedDate)
        .ThenByDescending(c => c.Id);
    }

    var result = await _commentService.GetRecentCommentsAsync(
      count: count,
      filter: filter,
      lastDateCursor: lastDate,
      lastIdCursor: lastId,
      include: include,
      orderBy: orderBy,
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
