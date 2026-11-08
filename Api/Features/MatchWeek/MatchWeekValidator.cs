using FluentValidation;

namespace Api.Features.MatchWeek;

public class SaveMatchWeekRequestValidator : AbstractValidator<SaveMatchWeekRequest>
{
  public SaveMatchWeekRequestValidator()
  {
    RuleFor(r => r.Formation)
      .NotEmpty()
      .WithMessage("Diziliş zorunludur.")
      .MaximumLength(20)
      .WithMessage("Diziliş en fazla 20 karakter olabilir.");

    RuleFor(r => r.OpponentClubId)
      .GreaterThan(0)
      .WithMessage("Rakip kulüp zorunludur.");

    RuleFor(r => r)
      .Must(ScoresArePaired)
      .WithMessage("Ev sahibi ve deplasman skorları birlikte girilmeli veya birlikte boş bırakılmalıdır.");

    RuleFor(r => r.HomeScore)
      .GreaterThanOrEqualTo(0)
      .When(r => r.HomeScore.HasValue)
      .WithMessage("Ev sahibi skoru 0 veya daha büyük olmalıdır.");

    RuleFor(r => r.AwayScore)
      .GreaterThanOrEqualTo(0)
      .When(r => r.AwayScore.HasValue)
      .WithMessage("Deplasman skoru 0 veya daha büyük olmalıdır.");

    RuleFor(r => r.Slots)
      .NotNull()
      .WithMessage("Kadro slotları zorunludur.");

    RuleForEach(r => r.Slots).ChildRules(slot =>
    {
      slot.RuleFor(s => s.SlotKey)
        .NotEmpty()
        .WithMessage("Slot anahtarı zorunludur.")
        .MaximumLength(20)
        .WithMessage("Slot anahtarı en fazla 20 karakter olabilir.");

      slot.RuleFor(s => s.PlayerId)
        .GreaterThan(0)
        .WithMessage("Geçersiz oyuncu ID.");

      slot.RuleFor(s => s.SortOrder)
        .GreaterThanOrEqualTo(0)
        .WithMessage("Sıralama 0 veya daha büyük olmalıdır.");
    });
  }

  private static bool ScoresArePaired(SaveMatchWeekRequest request)
  {
    return request.HomeScore.HasValue == request.AwayScore.HasValue;
  }
}
