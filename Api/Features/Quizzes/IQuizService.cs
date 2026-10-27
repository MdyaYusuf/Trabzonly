using System.Linq.Expressions;
using Api.Core.Responses;

namespace Api.Features.Quizzes;

public interface IQuizService
{
  Task<ReturnModel<List<QuizListItemDto>>> GetActiveListAsync(
    int? categoryId = null,
    string? sort = null,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<QuizTakeDto>> GetTakeAsync(
    Guid id,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<QuizPlatformStatsDto>> GetPlatformStatsAsync(
    CancellationToken cancellationToken = default);

  Task<ReturnModel<List<QuizLeaderboardEntryDto>>> GetLeaderboardAsync(
    int take = QuizBusinessRules.DefaultLeaderboardTake,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<QuizUserStatsDto>> GetMyStatsAsync(
    Guid currentUserId,
    CancellationToken cancellationToken = default);

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

  Task<ReturnModel<List<QuizListItemDto>>> GetMostTakenQuizzesAsync(
    int count,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<CursorPagedResponse<QuizListItemDto>>> GetRecentQuizzesAsync(
    int count,
    DateTime? lastDateCursor = null,
    Guid? lastIdCursor = null,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<CreatedQuizResponseDto>> AddAsync(
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

  Task<ReturnModel<CheckQuizAnswerResponse>> CheckAnswerAsync(
    CheckQuizAnswerRequest request,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<UserQuizResultResponseDto>> SubmitQuizAsync(
    SubmitQuizRequest request,
    Guid currentUserId,
    CancellationToken cancellationToken = default);
}
