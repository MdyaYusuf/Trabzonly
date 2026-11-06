using System.Linq.Expressions;
using Api.Core.Repositories;

namespace Api.Features.Quizzes;

public interface IQuizRepository : IRepository<Quiz, Guid>
{
  Task<(List<QuizAdminListItemDto> Items, int TotalCount)> GetAdminListAsync(
    Expression<Func<Quiz, bool>>? filter = null,
    string? sort = null,
    int pageNumber = 1,
    int pageSize = 10,
    CancellationToken cancellationToken = default);

  Task<List<Quiz>> GetMostTakenQuizzesAsync(
    int count,
    Func<IQueryable<Quiz>, IQueryable<Quiz>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<List<Quiz>> GetRecentQuizzesAsync(
    int count,
    DateTime? lastDateCursor = null,
    Guid? lastIdCursor = null,
    Func<IQueryable<Quiz>, IQueryable<Quiz>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);
}