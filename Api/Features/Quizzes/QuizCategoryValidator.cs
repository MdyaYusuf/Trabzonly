using FluentValidation;

namespace Api.Features.Quizzes;

public class CreateQuizCategoryRequestValidator : AbstractValidator<CreateQuizCategoryRequest>
{
  public CreateQuizCategoryRequestValidator()
  {
    RuleFor(c => c.Name)
      .NotEmpty().WithMessage("Kategori adı boş olamaz.")
      .MaximumLength(100);

    RuleFor(c => c.Description)
      .MaximumLength(500)
      .When(c => !string.IsNullOrEmpty(c.Description));

    RuleFor(c => c.ImageUrl)
      .MaximumLength(500)
      .When(c => !string.IsNullOrEmpty(c.ImageUrl));
  }
}

public class UpdateQuizCategoryRequestValidator : AbstractValidator<UpdateQuizCategoryRequest>
{
  public UpdateQuizCategoryRequestValidator()
  {
    RuleFor(c => c.Id)
      .GreaterThan(0).WithMessage("Geçersiz kategori ID.");

    RuleFor(c => c.Name)
      .NotEmpty().WithMessage("Kategori adı boş olamaz.")
      .MaximumLength(100);

    RuleFor(c => c.Description)
      .MaximumLength(500)
      .When(c => !string.IsNullOrEmpty(c.Description));

    RuleFor(c => c.ImageUrl)
      .MaximumLength(500)
      .When(c => !string.IsNullOrEmpty(c.ImageUrl));
  }
}
