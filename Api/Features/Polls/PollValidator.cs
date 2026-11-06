using FluentValidation;

namespace Api.Features.Polls;

public class CreatePollRequestValidator : AbstractValidator<CreatePollRequest>
{
  public CreatePollRequestValidator()
  {
    RuleFor(p => p.Question)
      .NotEmpty().WithMessage("Anket sorusu boş olamaz.")
      .MaximumLength(300).WithMessage("Anket sorusu en fazla 300 karakter olabilir.");

    RuleFor(p => p)
      .Must(p => !(p.PlayerId.HasValue && p.PostId.HasValue))
      .WithMessage("Anket hem oyuncuya hem gönderiye bağlanamaz.");

    RuleFor(p => p.Options)
      .NotNull().WithMessage("Anket seçenekleri zorunludur.")
      .Must(options => options != null && options.Count >= 2 && options.Count <= 4)
      .WithMessage("Anket 2 ile 4 arasında seçenek içermelidir.");

    RuleForEach(p => p.Options).ChildRules(option =>
    {
      option.RuleFor(o => o.Label)
        .NotEmpty().WithMessage("Seçenek metni boş olamaz.")
        .MaximumLength(200).WithMessage("Seçenek metni en fazla 200 karakter olabilir.");
    });
  }
}

public class UpdatePollRequestValidator : AbstractValidator<UpdatePollRequest>
{
  public UpdatePollRequestValidator()
  {
    RuleFor(p => p.Id)
      .GreaterThan(0).WithMessage("Geçersiz anket ID.");

    RuleFor(p => p.Question)
      .NotEmpty().WithMessage("Anket sorusu boş olamaz.")
      .MaximumLength(300).WithMessage("Anket sorusu en fazla 300 karakter olabilir.");

    When(p => p.Options != null, () =>
    {
      RuleFor(p => p.Options!)
        .Must(options => options.Count >= 2 && options.Count <= 4)
        .WithMessage("Anket 2 ile 4 arasında seçenek içermelidir.");

      RuleForEach(p => p.Options!).ChildRules(option =>
      {
        option.RuleFor(o => o.Label)
          .NotEmpty().WithMessage("Seçenek metni boş olamaz.")
          .MaximumLength(200).WithMessage("Seçenek metni en fazla 200 karakter olabilir.");
      });
    });
  }
}

public class VotePollRequestValidator : AbstractValidator<VotePollRequest>
{
  public VotePollRequestValidator()
  {
    RuleFor(v => v.OptionId)
      .GreaterThan(0).WithMessage("Geçersiz seçenek ID.");
  }
}
