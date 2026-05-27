using Api.Core.Repositories;

namespace Api.Features.Quizzes;

public interface IQuizRepository : IRepository<Quiz, Guid>
{
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