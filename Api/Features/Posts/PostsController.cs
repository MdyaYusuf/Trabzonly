using Api.Core.Controllers;
using Api.Core.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Features.Posts;

[ApiController]
[Route("api/posts")]
public class PostsController(IPostService _postService) : CustomBaseController
{
  [HttpGet]
  public async Task<IActionResult> GetAll(
    [FromQuery] PaginationRequest pagination,
    CancellationToken cancellationToken = default)
  {
    var result = await _postService.GetAllAsync(
      pageNumber: pagination.PageNumber,
      pageSize: pagination.PageSize,
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("{id:guid}")]
  public async Task<IActionResult> GetById(
    Guid id,
    CancellationToken cancellationToken)
  {
    var result = await _postService.GetByIdAsync(id: id, cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("top-commented/{count:int}")]
  public async Task<IActionResult> GetTopCommentedPosts(
    int count,
    CancellationToken cancellationToken)
  {
    var result = await _postService.GetTopCommentedPostsAsync(count: count, cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("recent/{count:int}")]
  public async Task<IActionResult> GetRecentPosts(
    int count,
    [FromQuery] DateTime? lastDate = null,
    [FromQuery] Guid? lastId = null,
    CancellationToken cancellationToken = default)
  {
    var result = await _postService.GetRecentPostsAsync(
      count: count,
      lastDateCursor: lastDate,
      lastIdCursor: lastId,
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize]
  [HttpPost]
  public async Task<IActionResult> Add(
    [FromForm] CreatePostRequest request,
    CancellationToken cancellationToken)
  {
    var result = await _postService.AddAsync(
      request: request,
      currentUserId: GetUserId(),
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize]
  [HttpPut]
  public async Task<IActionResult> Update(
    [FromForm] UpdatePostRequest request,
    CancellationToken cancellationToken)
  {
    var result = await _postService.UpdateAsync(
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
    var result = await _postService.RemoveAsync(
      id: id,
      currentUserId: GetUserId(),
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }
}