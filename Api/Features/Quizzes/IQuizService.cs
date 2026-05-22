using System.Linq.Expressions;
using Api.Core.Responses;

namespace Api.Features.Quizzes;

public interface IQuizService
{
  Task<ReturnModel<List<QuizResponseDto>>> GetAllAsync(
    Expression<Func<Quiz, bool>>? filter = null,
    Func<IQueryable<Quiz>, IQueryable<Quiz>>? include = null,
    Func<IQueryable<Quiz>, IOrderedQueryable<Quiz>>? orderBy = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<QuizResponseDto>> GetByIdAsync(
    Guid id,
    Func<IQueryable<Quiz>, IQueryable<Quiz>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<QuizResponseDto>> AddAsync(
    CreateQuizRequest request,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> UpdateAsync(
    UpdateQuizRequest request,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> RemoveAsync(
    Guid id,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<UserQuizResultResponseDto>> SubmitQuizAsync(
    SubmitQuizRequest request,
    CancellationToken cancellationToken = default);
}