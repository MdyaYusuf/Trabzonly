using FluentValidation;

namespace Api.Features.Squads;

public class CreateSquadRequestValidator : AbstractValidator<CreateSquadRequest>
{
  public CreateSquadRequestValidator()
  {
    RuleFor(s => s.Title)
      .NotEmpty().WithMessage("Başlık boş olamaz.")
      .MaximumLength(200).WithMessage("Başlık en fazla 200 karakter olabilir.");

    RuleFor(s => s.Formation)
      .NotEmpty().WithMessage("Diziliş boş olamaz.")
      .MaximumLength(50).WithMessage("Diziliş en fazla 50 karakter olabilir.")
      .Must(formation => SquadTactics.FormationStarterSlotKeys.ContainsKey(formation))
      .WithMessage("Geçersiz diziliş.");

    RuleFor(s => s.Notes)
      .MaximumLength(SquadTactics.NotesMaxLength)
      .WithMessage($"Notlar en fazla {SquadTactics.NotesMaxLength} karakter olabilir.");

    RuleFor(s => s.AttackStyle)
      .NotEmpty().WithMessage("Hücum anlayışı zorunludur.")
      .Must(value => SquadTactics.AttackStyles.Contains(value))
      .WithMessage("Geçersiz hücum anlayışı.");

    RuleFor(s => s.DefenseLine)
      .NotEmpty().WithMessage("Savunma çizgisi zorunludur.")
      .Must(value => SquadTactics.DefenseLines.Contains(value))
      .WithMessage("Geçersiz savunma çizgisi.");

    RuleFor(s => s.Tempo)
      .NotEmpty().WithMessage("Tempo zorunludur.")
      .Must(value => SquadTactics.Tempos.Contains(value))
      .WithMessage("Geçersiz tempo.");

    RuleFor(s => s.CaptainPlayerId)
      .GreaterThan(0).WithMessage("Kaptan seçimi zorunludur.");

    RuleFor(s => s.CornerTakerPlayerId)
      .GreaterThan(0).WithMessage("Korner sorumlusu seçimi zorunludur.");

    RuleFor(s => s.FreeKickTakerPlayerId)
      .GreaterThan(0).WithMessage("Serbest vuruş sorumlusu seçimi zorunludur.");

    RuleFor(s => s.Slots)
      .NotNull().WithMessage("Kadro mevkileri zorunludur.")
      .Must(slots => slots.Count == SquadTactics.TotalSlotCount)
      .WithMessage($"Kadro tam olarak {SquadTactics.TotalSlotCount} oyuncudan oluşmalıdır (11 ilk 11 + 10 yedek).");

    RuleForEach(s => s.Slots).SetValidator(new SquadSlotRequestValidator());
  }
}

public class UpdateSquadRequestValidator : AbstractValidator<UpdateSquadRequest>
{
  public UpdateSquadRequestValidator()
  {
    RuleFor(s => s.Id)
      .NotEmpty().WithMessage("Geçersiz kadro ID.");

    RuleFor(s => s.Title)
      .NotEmpty().WithMessage("Başlık boş olamaz.")
      .MaximumLength(200).WithMessage("Başlık en fazla 200 karakter olabilir.");

    RuleFor(s => s.Formation)
      .NotEmpty().WithMessage("Diziliş boş olamaz.")
      .MaximumLength(50).WithMessage("Diziliş en fazla 50 karakter olabilir.")
      .Must(formation => SquadTactics.FormationStarterSlotKeys.ContainsKey(formation))
      .WithMessage("Geçersiz diziliş.");

    RuleFor(s => s.Notes)
      .MaximumLength(SquadTactics.NotesMaxLength)
      .WithMessage($"Notlar en fazla {SquadTactics.NotesMaxLength} karakter olabilir.");

    RuleFor(s => s.AttackStyle)
      .NotEmpty().WithMessage("Hücum anlayışı zorunludur.")
      .Must(value => SquadTactics.AttackStyles.Contains(value))
      .WithMessage("Geçersiz hücum anlayışı.");

    RuleFor(s => s.DefenseLine)
      .NotEmpty().WithMessage("Savunma çizgisi zorunludur.")
      .Must(value => SquadTactics.DefenseLines.Contains(value))
      .WithMessage("Geçersiz savunma çizgisi.");

    RuleFor(s => s.Tempo)
      .NotEmpty().WithMessage("Tempo zorunludur.")
      .Must(value => SquadTactics.Tempos.Contains(value))
      .WithMessage("Geçersiz tempo.");

    RuleFor(s => s.CaptainPlayerId)
      .GreaterThan(0).WithMessage("Kaptan seçimi zorunludur.");

    RuleFor(s => s.CornerTakerPlayerId)
      .GreaterThan(0).WithMessage("Korner sorumlusu seçimi zorunludur.");

    RuleFor(s => s.FreeKickTakerPlayerId)
      .GreaterThan(0).WithMessage("Serbest vuruş sorumlusu seçimi zorunludur.");

    RuleFor(s => s.Slots)
      .NotNull().WithMessage("Kadro mevkileri zorunludur.")
      .Must(slots => slots.Count == SquadTactics.TotalSlotCount)
      .WithMessage($"Kadro tam olarak {SquadTactics.TotalSlotCount} oyuncudan oluşmalıdır (11 ilk 11 + 10 yedek).");

    RuleForEach(s => s.Slots).SetValidator(new SquadSlotRequestValidator());
  }
}

public class SquadSlotRequestValidator : AbstractValidator<SquadSlotRequest>
{
  public SquadSlotRequestValidator()
  {
    RuleFor(s => s.SlotKey)
      .NotEmpty().WithMessage("Mevki anahtarı boş olamaz.")
      .MaximumLength(20).WithMessage("Mevki anahtarı en fazla 20 karakter olabilir.");

    RuleFor(s => s.SortOrder)
      .GreaterThanOrEqualTo(0).WithMessage("Sıralama değeri 0 veya daha büyük olmalıdır.");

    RuleFor(s => s.PlayerId)
      .GreaterThan(0).WithMessage("Oyuncu seçimi zorunludur.");
  }
}

public class RateSquadRequestValidator : AbstractValidator<RateSquadRequest>
{
  public RateSquadRequestValidator()
  {
    RuleFor(r => r.Score)
      .InclusiveBetween(1m, 5m).WithMessage("Puan 1 ile 5 arasında olmalıdır.")
      .Must(BeHalfStep).WithMessage("Puan 0.5'lik adımlarla verilmelidir (ör. 3.0, 3.5, 4.0).");
  }

  private static bool BeHalfStep(decimal score)
  {
    return score * 2m == Math.Floor(score * 2m);
  }
}
