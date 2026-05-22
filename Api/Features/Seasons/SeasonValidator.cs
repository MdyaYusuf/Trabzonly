using FluentValidation;

namespace Api.Features.Seasons;

public class CreateSeasonRequestValidator : AbstractValidator<CreateSeasonRequest>
{
  public CreateSeasonRequestValidator()
  {
    RuleFor(s => s.Name)
      .NotEmpty().WithMessage("Sezon adı boş olamaz.")
      .MaximumLength(20).WithMessage("Sezon adı en fazla 20 karakter olabilir.");

    RuleFor(s => s.StartDate)
      .NotEmpty().WithMessage("Başlangıç tarihi boş olamaz.");

    RuleFor(s => s.EndDate)
      .NotEmpty().WithMessage("Bitiş tarihi boş olamaz.")
      .GreaterThan(s => s.StartDate).WithMessage("Bitiş tarihi, başlangıç tarihinden sonra olmalıdır.");
  }
}

public class UpdateSeasonRequestValidator : AbstractValidator<UpdateSeasonRequest>
{
  public UpdateSeasonRequestValidator()
  {
    RuleFor(s => s.Id).NotEmpty().WithMessage("Geçersiz sezon ID.");

    RuleFor(s => s.Name)
      .NotEmpty().WithMessage("Sezon adı boş olamaz.")
      .MaximumLength(20).WithMessage("Sezon adı en fazla 20 karakter olabilir.");

    RuleFor(s => s.StartDate)
      .NotEmpty().WithMessage("Başlangıç tarihi boş olamaz.");

    RuleFor(s => s.EndDate)
      .NotEmpty().WithMessage("Bitiş tarihi boş olamaz.")
      .GreaterThan(s => s.StartDate).WithMessage("Bitiş tarihi, başlangıç tarihinden sonra olmalıdır.");
  }
}