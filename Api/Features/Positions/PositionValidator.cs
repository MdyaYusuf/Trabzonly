using FluentValidation;

namespace Api.Features.Positions;

public class CreatePositionRequestValidator : AbstractValidator<CreatePositionRequest>
{
  public CreatePositionRequestValidator()
  {
    RuleFor(p => p.Name)
      .NotEmpty().WithMessage("Pozisyon adı boş olamaz.")
      .MaximumLength(50).WithMessage("Pozisyon adı en fazla 50 karakter olabilir.");

    RuleFor(p => p.Abbreviation)
      .NotEmpty().WithMessage("Kısaltma boş olamaz.")
      .MaximumLength(10).WithMessage("Kısaltma en fazla 10 karakter olabilir.");
  }
}

public class UpdatePositionRequestValidator : AbstractValidator<UpdatePositionRequest>
{
  public UpdatePositionRequestValidator()
  {
    RuleFor(p => p.Id).NotEmpty().WithMessage("Geçersiz pozisyon ID.");

    RuleFor(p => p.Name).NotEmpty().WithMessage("Pozisyon adı boş olamaz.").MaximumLength(50);
    RuleFor(p => p.Abbreviation).NotEmpty().WithMessage("Kısaltma boş olamaz.").MaximumLength(10);
  }
}