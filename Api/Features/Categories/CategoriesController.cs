using Api.Core.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Features.Categories;

[ApiController]
[Route("api/categories")]
public class CategoriesController(ICategoryService _categoryService) : CustomBaseController
{
  [HttpGet]
  public async Task<IActionResult> GetAll(
    CancellationToken cancellationToken)
  {
    var result = await _categoryService.GetAllAsync(cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [HttpGet("{id:int}")]
  public async Task<IActionResult> GetById(
    int id,
    CancellationToken cancellationToken)
  {
    var result = await _categoryService.GetByIdAsync(id: id, cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpPost]
  public async Task<IActionResult> Add(
    [FromBody] CreateCategoryRequest request,
    CancellationToken cancellationToken)
  {
    var result = await _categoryService.AddAsync(
      request: request,
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpPut]
  public async Task<IActionResult> Update(
    [FromBody] UpdateCategoryRequest request,
    CancellationToken cancellationToken)
  {
    var result = await _categoryService.UpdateAsync(
      request: request,
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpDelete("{id:int}")]
  public async Task<IActionResult> Delete(
    int id,
    CancellationToken cancellationToken)
  {
    var result = await _categoryService.RemoveAsync(id: id, cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }
}