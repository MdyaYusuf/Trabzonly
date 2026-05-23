using Api.Core.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Features.Blogs;

[ApiController]
[Route("api/blogs")]
public class BlogsController(IBlogService _blogService) : CustomBaseController
{
  [HttpGet]
  public async Task<IActionResult> GetAll(
    CancellationToken cancellationToken)
  {
    var result = await _blogService.GetAllAsync(cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("{id:guid}")]
  public async Task<IActionResult> GetById(
    Guid id,
    CancellationToken cancellationToken)
  {
    var result = await _blogService.GetByIdAsync(id: id, cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("top-commented/{count:int}")]
  public async Task<IActionResult> GetTopCommentedBlogs(
    int count,
    CancellationToken cancellationToken)
  {
    var result = await _blogService.GetTopCommentedBlogsAsync(count: count, cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("recent/{count:int}")]
  public async Task<IActionResult> GetRecentBlogs(
    int count,
    CancellationToken cancellationToken)
  {
    var result = await _blogService.GetRecentBlogsAsync(count: count, cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize]
  [HttpPost]
  public async Task<IActionResult> Add(
    [FromForm] CreateBlogRequest request,
    CancellationToken cancellationToken)
  {
    var result = await _blogService.AddAsync(
      request: request,
      currentUserId: GetUserId(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize]
  [HttpPut]
  public async Task<IActionResult> Update(
    [FromForm] UpdateBlogRequest request,
    CancellationToken cancellationToken)
  {
    var result = await _blogService.UpdateAsync(
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
    var result = await _blogService.RemoveAsync(
      id: id,
      currentUserId: GetUserId(),
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }
}