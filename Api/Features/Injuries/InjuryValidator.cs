using FluentValidation;

namespace Api.Features.Injuries;

public class CreateInjuryRequestValidator : AbstractValidator<CreateInjuryRequest>
{
  public CreateInjuryRequestValidator()
  {
    RuleFor(i => i.Name)
      .NotEmpty().WithMessage("Sakatlık adı boş olamaz.")
      .MaximumLength(150).WithMessage("Sakatlık adı en fazla 150 karakter olabilir.");

    RuleFor(i => i.DaysInjured)
      .GreaterThanOrEqualTo(0).WithMessage("Sakatlık süresi 0'dan küçük olamaz.");

    RuleFor(i => i.GamesMissed)
      .GreaterThanOrEqualTo(0).WithMessage("Kaçırılan maç sayısı 0'dan küçük olamaz.");

    RuleFor(i => i.PlayerId)
      .NotEmpty().WithMessage("Oyuncu ID boş olamaz.");
  }
}

public class UpdateInjuryRequestValidator : AbstractValidator<UpdateInjuryRequest>
{
  public UpdateInjuryRequestValidator()
  {
    RuleFor(i => i.Id).NotEmpty().WithMessage("Geçersiz sakatlık ID.");

    RuleFor(i => i.Name)
      .NotEmpty().WithMessage("Sakatlık adı boş olamaz.")
      .MaximumLength(150).WithMessage("Sakatlık adı en fazla 150 karakter olabilir.");

    RuleFor(i => i.DaysInjured).GreaterThanOrEqualTo(0).WithMessage("Sakatlık süresi 0'dan küçük olamaz.");

    RuleFor(i => i.GamesMissed).GreaterThanOrEqualTo(0).WithMessage("Kaçırılan maç sayısı 0'dan küçük olamaz.");

    RuleFor(i => i.PlayerId).NotEmpty().WithMessage("Oyuncu ID boş olamaz.");
  }
}