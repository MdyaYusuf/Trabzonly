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

    RuleFor(q => q.Points)
      .GreaterThan(0).WithMessage("Puan 0'dan büyük olmalıdır.");

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
  }
}

public class SubmitQuizRequestValidator : AbstractValidator<SubmitQuizRequest>
{
  public SubmitQuizRequestValidator()
  {
    RuleFor(s => s.QuizId)
      .NotEmpty().WithMessage("Quiz ID boş olamaz.");

    RuleFor(s => s.UserId)
      .NotEmpty().WithMessage("Kullanıcı ID boş olamaz.");

    RuleFor(s => s.CompletionTime)
      .GreaterThan(TimeSpan.Zero).WithMessage("Tamamlanma süresi geçerli olmalıdır.");

    RuleFor(s => s.Answers)
      .NotEmpty().WithMessage("Cevaplar boş olamaz.");
  }
}