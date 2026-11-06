using System.Linq.Expressions;
using Api.Core.Repositories;
using Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Quizzes;

public class EfQuizRepository : EfBaseRepository<BaseDbContext, Quiz, Guid>, IQuizRepository
{
  public EfQuizRepository(BaseDbContext context) : base(context)
  {

  }

  public async Task<(List<QuizAdminListItemDto> Items, int TotalCount)> GetAdminListAsync(
    Expression<Func<Quiz, bool>>? filter = null,
    string? sort = null,
    int pageNumber = 1,
    int pageSize = 10,
    CancellationToken cancellationToken = default)
  {
    IQueryable<Quiz> query = _context.Set<Quiz>().AsNoTracking();

    if (filter != null)
    {
      query = query.Where(filter);
    }

    int totalCount = await query.CountAsync(cancellationToken);

    query = ApplyAdminSort(query, sort);

    List<QuizAdminListItemDto> items = await query
      .Skip((pageNumber - 1) * pageSize)
      .Take(pageSize)
      .Select(quiz => new QuizAdminListItemDto(
        quiz.Id,
        quiz.Title,
        quiz.Description,
        quiz.QuizCategoryId,
        quiz.QuizCategory.Name,
        quiz.Questions.Count,
        quiz.IsActive))
      .ToListAsync(cancellationToken);

    return (items, totalCount);
  }

  private static IQueryable<Quiz> ApplyAdminSort(
    IQueryable<Quiz> query,
    string? sort)
  {
    string normalized = sort?.Trim().ToLowerInvariant() ?? QuizAdminSortOptions.TitleAsc;

    return normalized switch
    {
      QuizAdminSortOptions.QuestionsAsc => query
        .OrderBy(quiz => quiz.Questions.Count)
        .ThenBy(quiz => quiz.Title),
      QuizAdminSortOptions.QuestionsDesc => query
        .OrderByDescending(quiz => quiz.Questions.Count)
        .ThenBy(quiz => quiz.Title),
      _ => query
        .OrderBy(quiz => quiz.Title)
        .ThenBy(quiz => quiz.Id)
    };
  }

  public async Task<List<Quiz>> GetMostTakenQuizzesAsync(
    int count,
    Func<IQueryable<Quiz>, IQueryable<Quiz>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    IQueryable<Quiz> query = Query(enableTracking, withDeleted);

    if (include != null)
    {
      query = include(query);
    }

    return await query
      .Where(q => q.IsActive)
      .OrderByDescending(q => q.UserQuizResults.Count)
      .Take(count)
      .ToListAsync(cancellationToken);
  }

  public async Task<List<Quiz>> GetRecentQuizzesAsync(
    int count,
    DateTime? lastDateCursor = null,
    Guid? lastIdCursor = null,
    Func<IQueryable<Quiz>, IQueryable<Quiz>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    IQueryable<Quiz> query = Query(enableTracking, withDeleted);

    if (include != null)
    {
      query = include(query);
    }

    if (lastDateCursor.HasValue && lastIdCursor.HasValue)
    {
      query = query.Where(q => q.CreatedDate < lastDateCursor ||
                              (q.CreatedDate == lastDateCursor && q.Id.CompareTo(lastIdCursor.Value) < 0));
    }

    return await query
      .Where(q => q.IsActive)
      .OrderByDescending(q => q.CreatedDate).ThenByDescending(q => q.Id)
      .Take(count)
      .ToListAsync(cancellationToken);
  }
}