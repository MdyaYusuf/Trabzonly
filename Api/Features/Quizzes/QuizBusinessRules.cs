using Api.Core.Exceptions;

namespace Api.Features.Quizzes;

public class QuizBusinessRules(IQuizRepository _quizRepository)
{
  public const int SecondsPerQuestion = 10;
  public const int CompletionTimeBufferSeconds = 5;
  public const int MinDistinctQuizzesForLeaderboard = 3;
  public const int DefaultLeaderboardTake = 10;

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

  public Question GetQuestionBelongingToQuizIfExist(Quiz quiz, Guid questionId)
  {
    Question? question = quiz.Questions.FirstOrDefault(q => q.Id == questionId);

    if (question == null)
    {
      throw new NotFoundException($"{questionId} numaralı soru bu quizde bulunamadı.");
    }

    return question;
  }

  public Answer GetCorrectAnswerIfExist(Question question)
  {
    Answer? correctAnswer = question.Answers.FirstOrDefault(a => a.IsCorrect);

    if (correctAnswer == null)
    {
      throw new BusinessException($"'{question.Text}' sorusu için doğru cevap tanımlı değil.");
    }

    return correctAnswer;
  }

  public TimeSpan ClampCompletionTime(TimeSpan completionTime, int questionCount)
  {
    if (questionCount < 1)
    {
      throw new BusinessException("Quiz en az bir soru içermelidir.");
    }

    TimeSpan maxAllowed = TimeSpan.FromSeconds(
      (SecondsPerQuestion * questionCount) + CompletionTimeBufferSeconds);

    if (completionTime <= TimeSpan.Zero)
    {
      throw new BusinessException("Tamamlanma süresi geçerli olmalıdır.");
    }

    if (completionTime > maxAllowed)
    {
      return maxAllowed;
    }

    return completionTime;
  }

  public void SubmitAnswersMustBeValid(Quiz quiz, List<QuestionAnswerDto> answers)
  {
    HashSet<Guid> quizQuestionIds = quiz.Questions.Select(q => q.Id).ToHashSet();
    HashSet<Guid> seenQuestionIds = [];

    foreach (QuestionAnswerDto answer in answers)
    {
      if (!seenQuestionIds.Add(answer.QuestionId))
      {
        throw new BusinessException("Aynı soruya birden fazla cevap gönderilemez.");
      }

      if (!quizQuestionIds.Contains(answer.QuestionId))
      {
        throw new BusinessException("Gönderilen cevaplar bu quize ait olmayan sorular içeriyor.");
      }

      Question question = quiz.Questions.First(q => q.Id == answer.QuestionId);
      bool answerBelongsToQuestion = question.Answers.Any(a => a.Id == answer.AnswerId);

      if (!answerBelongsToQuestion)
      {
        throw new BusinessException("Gönderilen cevap seçenekleri ilgili soruya ait değil.");
      }
    }
  }
}
