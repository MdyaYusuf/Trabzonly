using Api.Core.Exceptions;

namespace Api.Features.Quizzes;

public class QuizCategoryBusinessRules(IQuizCategoryRepository _quizCategoryRepository)
{
  public async Task<QuizCategory> GetCategoryIfExistAsync(
    int id,
    Func<IQueryable<QuizCategory>, IQueryable<QuizCategory>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    QuizCategory? category = await _quizCategoryRepository.GetByIdAsync(
      id,
      include,
      enableTracking,
      cancellationToken);

    if (category == null)
    {
      throw new NotFoundException($"{id} numaralı quiz kategorisi bulunamadı.");
    }

    return category;
  }

  public async Task CategoryMustExistAsync(int id, CancellationToken cancellationToken = default)
  {
    bool exists = await _quizCategoryRepository.AnyAsync(c => c.Id == id, cancellationToken);

    if (!exists)
    {
      throw new NotFoundException($"{id} numaralı quiz kategorisi bulunamadı.");
    }
  }

  public async Task CategoryNameCannotBeDuplicatedAsync(
    string name,
    CancellationToken cancellationToken = default)
  {
    bool exists = await _quizCategoryRepository.AnyAsync(
      c => c.Name == name,
      cancellationToken);

    if (exists)
    {
      throw new BusinessException("Bu ada sahip bir quiz kategorisi zaten mevcut.");
    }
  }

  public async Task CategoryNameCannotBeDuplicatedWhenUpdatedAsync(
    int id,
    string name,
    CancellationToken cancellationToken = default)
  {
    bool exists = await _quizCategoryRepository.AnyAsync(
      c => c.Id != id && c.Name == name,
      cancellationToken);

    if (exists)
    {
      throw new BusinessException("Bu ada sahip başka bir quiz kategorisi zaten mevcut.");
    }
  }

  public async Task CategoryMustNotHaveQuizzesWhenDeletedAsync(
    int id,
    CancellationToken cancellationToken = default)
  {
    QuizCategory category = await GetCategoryIfExistAsync(
      id,
      enableTracking: false,
      cancellationToken: cancellationToken);

    bool hasQuizzes = await _quizCategoryRepository.AnyAsync(
      c => c.Id == id && c.Quizzes.Any(),
      cancellationToken);

    if (hasQuizzes)
    {
      throw new BusinessException(
        $"'{category.Name}' kategorisine bağlı quizler varken silinemez.");
    }
  }
}
