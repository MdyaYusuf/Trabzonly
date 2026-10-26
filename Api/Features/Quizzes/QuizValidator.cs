using FluentValidation;

namespace Api.Features.Quizzes;

public class CreateQuizRequestValidator : AbstractValidator<CreateQuizRequest>
{
  public CreateQuizRequestValidator()
  {
    RuleFor(q => q.Title)
      .NotEmpty().WithMessage("Quiz başlığı boş olamaz.")
      .MaximumLength(200);

    RuleFor(q => q.Description)
      .MaximumLength(1000)
      .When(q => !string.IsNullOrEmpty(q.Description));

    RuleFor(q => q.Category)
      .IsInEnum().WithMessage("Geçersiz quiz kategorisi.");

    RuleForEach(q => q.Questions)
      .SetValidator(new CreateQuestionRequestValidator());
  }
}

public class CreateQuestionRequestValidator : AbstractValidator<CreateQuestionRequest>
{
  public CreateQuestionRequestValidator()
  {
    RuleFor(q => q.Text)
      .NotEmpty().WithMessage("Soru metni boş olamaz.")
      .MaximumLength(1000);

    RuleFor(q => q.Explanation)
      .MaximumLength(2000)
      .When(q => !string.IsNullOrEmpty(q.Explanation));

    RuleFor(q => q.Points)
      .GreaterThan(0).WithMessage("Puan 0'dan büyük olmalıdır.");

    RuleFor(q => q.SortOrder)
      .GreaterThanOrEqualTo(0).WithMessage("Soru sırası 0 veya daha büyük olmalıdır.");

    RuleFor(q => q.Answers)
      .NotEmpty().WithMessage("Bir sorunun en az 1 cevabı olmalıdır.")
      .Must(answers => answers.Any(a => a.IsCorrect)).WithMessage("Soru için en az bir doğru cevap işaretlenmelidir.");

    RuleForEach(q => q.Answers)
      .SetValidator(new CreateAnswerRequestValidator());
  }
}

public class CreateAnswerRequestValidator : AbstractValidator<CreateAnswerRequest>
{
  public CreateAnswerRequestValidator()
  {
    RuleFor(a => a.Text)
      .NotEmpty().WithMessage("Cevap metni boş olamaz.")
      .MaximumLength(500);
  }
}

public class UpdateQuizRequestValidator : AbstractValidator<UpdateQuizRequest>
{
  public UpdateQuizRequestValidator()
  {
    RuleFor(q => q.Id)
      .NotEmpty().WithMessage("Geçersiz quiz ID.");

    RuleFor(q => q.Title)
      .NotEmpty().WithMessage("Quiz başlığı boş olamaz.")
      .MaximumLength(200);

    RuleFor(q => q.Description)
      .MaximumLength(1000)
      .When(q => !string.IsNullOrEmpty(q.Description));

    RuleFor(q => q.Category)
      .IsInEnum().WithMessage("Geçersiz quiz kategorisi.");
  }
}

public class SubmitQuizRequestValidator : AbstractValidator<SubmitQuizRequest>
{
  public SubmitQuizRequestValidator()
  {
    RuleFor(s => s.QuizId)
      .NotEmpty().WithMessage("Quiz ID boş olamaz.");

    RuleFor(s => s.CompletionTime)
      .GreaterThan(TimeSpan.Zero).WithMessage("Tamamlanma süresi geçerli olmalıdır.");

    RuleFor(s => s.Answers)
      .NotNull().WithMessage("Cevap listesi zorunludur.");

    RuleFor(s => s.Answers)
      .Must(answers => answers.Select(a => a.QuestionId).Distinct().Count() == answers.Count)
      .WithMessage("Aynı soruya birden fazla cevap gönderilemez.")
      .When(s => s.Answers != null);

    RuleForEach(s => s.Answers)
      .ChildRules(answer =>
      {
        answer.RuleFor(a => a.QuestionId)
          .NotEmpty().WithMessage("Soru ID boş olamaz.");

        answer.RuleFor(a => a.AnswerId)
          .NotEmpty().WithMessage("Cevap ID boş olamaz.");
      })
      .When(s => s.Answers != null);
  }
}

public class CheckQuizAnswerRequestValidator : AbstractValidator<CheckQuizAnswerRequest>
{
  public CheckQuizAnswerRequestValidator()
  {
    RuleFor(c => c.QuizId)
      .NotEmpty().WithMessage("Quiz ID boş olamaz.");

    RuleFor(c => c.QuestionId)
      .NotEmpty().WithMessage("Soru ID boş olamaz.");
  }
}
