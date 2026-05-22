using FluentValidation;

namespace Api.Features.Players;

public class CreatePlayerRequestValidator : AbstractValidator<CreatePlayerRequest>
{
  public CreatePlayerRequestValidator()
  {
    RuleFor(p => p.Name)
      .NotEmpty().WithMessage("Oyuncu adı boş olamaz.")
      .MaximumLength(100);

    RuleFor(p => p.Nationality)
      .NotEmpty().WithMessage("Uyruk boş olamaz.")
      .MaximumLength(100);

    RuleFor(p => p.DateOfBirth)
      .NotEmpty().WithMessage("Doğum tarihi boş olamaz.");

    RuleFor(p => p.PreferredFoot)
      .NotEmpty().WithMessage("Tercih edilen ayak boş olamaz.")
      .MaximumLength(20);

    RuleFor(p => p.CurrentTeam)
      .NotEmpty().WithMessage("Mevcut takım boş olamaz.")
      .MaximumLength(100);

    RuleFor(p => p.PositionId)
      .NotEmpty().WithMessage("Pozisyon ID boş olamaz.");

    RuleFor(p => p.Height)
      .GreaterThan(0)
      .When(p => p.Height.HasValue)
      .WithMessage("Boy 0'dan büyük olmalıdır.");

    RuleFor(p => p.Weight)
      .GreaterThan(0)
      .When(p => p.Weight.HasValue)
      .WithMessage("Kilo 0'dan büyük olmalıdır.");

    RuleFor(p => p.MarketValue)
      .GreaterThanOrEqualTo(0)
      .When(p => p.MarketValue.HasValue)
      .WithMessage("Piyasa değeri 0'dan küçük olamaz.");

    RuleFor(p => p.Wage)
      .GreaterThanOrEqualTo(0)
      .When(p => p.Wage.HasValue)
      .WithMessage("Maaş 0'dan küçük olamaz.");
  }
}

public class UpdatePlayerRequestValidator : AbstractValidator<UpdatePlayerRequest>
{
  public UpdatePlayerRequestValidator()
  {
    RuleFor(p => p.Id)
      .NotEmpty().WithMessage("Geçersiz oyuncu ID.");

    RuleFor(p => p.Name)
      .NotEmpty().WithMessage("Oyuncu adı boş olamaz.")
      .MaximumLength(100);

    RuleFor(p => p.Nationality)
      .NotEmpty().WithMessage("Uyruk boş olamaz.")
      .MaximumLength(100);

    RuleFor(p => p.DateOfBirth)
      .NotEmpty().WithMessage("Doğum tarihi boş olamaz.");

    RuleFor(p => p.PreferredFoot)
      .NotEmpty().WithMessage("Tercih edilen ayak boş olamaz.")
      .MaximumLength(20);

    RuleFor(p => p.CurrentTeam)
      .NotEmpty().WithMessage("Mevcut takım boş olamaz.")
      .MaximumLength(100);

    RuleFor(p => p.PositionId)
      .NotEmpty().WithMessage("Pozisyon ID boş olamaz.");

    RuleFor(p => p.Height)
      .GreaterThan(0).When(p => p.Height.HasValue)
      .WithMessage("Boy 0'dan büyük olmalıdır.");

    RuleFor(p => p.Weight)
      .GreaterThan(0).When(p => p.Weight.HasValue)
      .WithMessage("Kilo 0'dan büyük olmalıdır.");

    RuleFor(p => p.MarketValue)
      .GreaterThanOrEqualTo(0).When(p => p.MarketValue.HasValue)
      .WithMessage("Piyasa değeri 0'dan küçük olamaz.");

    RuleFor(p => p.Wage)
      .GreaterThanOrEqualTo(0).When(p => p.Wage.HasValue)
      .WithMessage("Maaş 0'dan küçük olamaz.");
  }
}