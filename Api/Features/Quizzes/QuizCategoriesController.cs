using Api.Core.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Features.Quizzes;

[ApiController]
[Route("api/quiz-categories")]
public class QuizCategoriesController(IQuizCategoryService _quizCategoryService) : CustomBaseController
{
  [HttpGet]
  public async Task<IActionResult> GetActive(CancellationToken cancellationToken)
  {
    var result = await _quizCategoryService.GetActiveAsync(cancellationToken);
    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpGet("manage")]
  public async Task<IActionResult> GetAllForAdmin(CancellationToken cancellationToken)
  {
    var result = await _quizCategoryService.GetAllForAdminAsync(
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpGet("{id:int}")]
  public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
  {
    var result = await _quizCategoryService.GetByIdAsync(id, cancellationToken);
    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpPost]
  public async Task<IActionResult> Add(
    [FromBody] CreateQuizCategoryRequest request,
    CancellationToken cancellationToken)
  {
    var result = await _quizCategoryService.AddAsync(
      request: request,
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpPut]
  public async Task<IActionResult> Update(
    [FromBody] UpdateQuizCategoryRequest request,
    CancellationToken cancellationToken)
  {
    var result = await _quizCategoryService.UpdateAsync(
      request: request,
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }

  [Authorize(Roles = "Admin")]
  [HttpDelete("{id:int}")]
  public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
  {
    var result = await _quizCategoryService.RemoveAsync(
      id: id,
      userRole: GetUserRole(),
      cancellationToken: cancellationToken);

    return CreateActionResult(result);
  }
}
