using FluentValidation;

namespace Api.Features.MatchWeek;

public class UpdateFixtureRequestValidator : AbstractValidator<UpdateFixtureRequest>
{
  public UpdateFixtureRequestValidator()
  {
    RuleFor(f => f.Id)
      .GreaterThan(0)
      .WithMessage("Geçersiz maç ID.");

    RuleFor(f => f)
      .Must(ScoresArePaired)
      .WithMessage("Ev sahibi ve deplasman skorları birlikte girilmeli veya birlikte boş bırakılmalıdır.");

    RuleFor(f => f.HomeScore)
      .GreaterThanOrEqualTo(0)
      .When(f => f.HomeScore.HasValue)
      .WithMessage("Ev sahibi skoru 0 veya daha büyük olmalıdır.");

    RuleFor(f => f.AwayScore)
      .GreaterThanOrEqualTo(0)
      .When(f => f.AwayScore.HasValue)
      .WithMessage("Deplasman skoru 0 veya daha büyük olmalıdır.");
  }

  private static bool ScoresArePaired(UpdateFixtureRequest request)
  {
    return request.HomeScore.HasValue == request.AwayScore.HasValue;
  }
}

public class UpdateFixtureWeekRequestValidator : AbstractValidator<UpdateFixtureWeekRequest>
{
  public UpdateFixtureWeekRequestValidator()
  {
    RuleFor(r => r.SeasonId)
      .GreaterThan(0)
      .WithMessage("Geçersiz sezon ID.");

    RuleFor(r => r.WeekNumber)
      .InclusiveBetween(1, 34)
      .WithMessage("Hafta numarası 1 ile 34 arasında olmalıdır.");

    RuleFor(r => r.Fixtures)
      .NotNull()
      .WithMessage("Maç listesi zorunludur.")
      .Must(fixtures => fixtures != null && fixtures.Count > 0)
      .WithMessage("En az bir maç güncellenmelidir.");

    RuleForEach(r => r.Fixtures).ChildRules(fixture =>
    {
      fixture.RuleFor(f => f.Id)
        .GreaterThan(0)
        .WithMessage("Geçersiz maç ID.");

      fixture.RuleFor(f => f)
        .Must(f => f.HomeScore.HasValue == f.AwayScore.HasValue)
        .WithMessage("Ev sahibi ve deplasman skorları birlikte girilmeli veya birlikte boş bırakılmalıdır.");

      fixture.RuleFor(f => f.HomeScore)
        .GreaterThanOrEqualTo(0)
        .When(f => f.HomeScore.HasValue)
        .WithMessage("Ev sahibi skoru 0 veya daha büyük olmalıdır.");

      fixture.RuleFor(f => f.AwayScore)
        .GreaterThanOrEqualTo(0)
        .When(f => f.AwayScore.HasValue)
        .WithMessage("Deplasman skoru 0 veya daha büyük olmalıdır.");
    });
  }
}
