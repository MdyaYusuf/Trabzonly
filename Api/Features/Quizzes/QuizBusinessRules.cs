using Api.Core.Exceptions;

namespace Api.Features.Quizzes;

public class QuizBusinessRules(IQuizRepository _quizRepository)
{
  public async Task<Quiz> GetQuizIfExistAsync(
    Guid id,
    Func<IQueryable<Quiz>, IQueryable<Quiz>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    var quiz = await _quizRepository.GetByIdAsync(id, include, enableTracking, cancellationToken);

    if (quiz == null)
    {
      throw new NotFoundException($"{id} numaralı quiz bulunamadı.");
    }

    return quiz;
  }

  public void AdminRoleRequired(string userRole)
  {
    if (userRole != "Admin")
    {
      throw new ForbiddenException("Bu işlem için yetkiniz bulunmamaktadır.");
    }
  }

  public async Task QuizTitleCannotBeDuplicatedAsync(string title, CancellationToken cancellationToken = default)
  {
    bool exists = await _quizRepository.AnyAsync(q => q.Title == title, cancellationToken);

    if (exists)
    {
      throw new BusinessException("Bu başlığa sahip bir quiz zaten mevcut. Lütfen farklı bir başlık seçiniz.");
    }
  }

  public async Task QuizTitleCannotBeDuplicatedWhenUpdatedAsync(Guid id, string title, CancellationToken cancellationToken = default)
  {
    bool exists = await _quizRepository.AnyAsync(q => q.Id != id && q.Title == title, cancellationToken);

    if (exists)
    {
      throw new BusinessException("Bu başlığa sahip başka bir quiz zaten mevcut. Lütfen farklı bir başlık seçiniz.");
    }
  }

  public void QuestionsMustHaveExactlyOneCorrectAnswer(List<CreateQuestionRequest> questions)
  {
    foreach (var question in questions)
    {
      int correctCount = question.Answers.Count(a => a.IsCorrect);
      if (correctCount != 1)
      {
        throw new BusinessException($"'{question.Text}' sorusu için tam olarak 1 adet doğru cevap belirlenmelidir.");
      }
    }
  }

  public void QuizMustBeActive(Quiz quiz)
  {
    if (!quiz.IsActive)
    {
      throw new BusinessException("Bu quiz şu anda aktif değil ve çözülemez.");
    }
  }
}