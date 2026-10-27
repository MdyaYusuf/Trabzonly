using Api.Core.Responses;

namespace Api.Features.Quizzes;

public interface IQuizCategoryService
{
  Task<ReturnModel<List<QuizCategoryResponseDto>>> GetActiveAsync(
    CancellationToken cancellationToken = default);

  Task<ReturnModel<List<QuizCategoryResponseDto>>> GetAllForAdminAsync(
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<QuizCategoryResponseDto>> GetByIdAsync(
    int id,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<CreatedQuizCategoryResponseDto>> AddAsync(
    CreateQuizCategoryRequest request,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> UpdateAsync(
    UpdateQuizCategoryRequest request,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> RemoveAsync(
    int id,
    string userRole,
    CancellationToken cancellationToken = default);
}
