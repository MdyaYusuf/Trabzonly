using FluentValidation;

namespace Api.Features.Categories;

public class CreateCategoryRequestValidator : AbstractValidator<CreateCategoryRequest>
{
  public CreateCategoryRequestValidator()
  {
    RuleFor(c => c.Name)
      .NotEmpty().WithMessage("Kategori adı boş olamaz.")
      .MaximumLength(100).WithMessage("Kategori adı en fazla 100 karakter olabilir.");

    RuleFor(c => c.Description)
      .MaximumLength(500).WithMessage("Açıklama en fazla 500 karakter olabilir.");
  }
}

public class UpdateCategoryRequestValidator : AbstractValidator<UpdateCategoryRequest>
{
  public UpdateCategoryRequestValidator()
  {
    RuleFor(c => c.Id).GreaterThan(0).WithMessage("Geçersiz kategori ID.");

    RuleFor(c => c.Name)
      .NotEmpty().WithMessage("Kategori adı boş olamaz.")
      .MaximumLength(100).WithMessage("Kategori adı en fazla 100 karakter olabilir.");

    RuleFor(c => c.Description)
      .MaximumLength(500).WithMessage("Açıklama en fazla 500 karakter olabilir.");
  }
}