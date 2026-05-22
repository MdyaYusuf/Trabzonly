using FluentValidation;

namespace Api.Features.Stats;

public class CreatePlayerStatsRequestValidator : AbstractValidator<CreatePlayerStatsRequest>
{
  public CreatePlayerStatsRequestValidator()
  {
    RuleFor(s => s.Team)
      .NotEmpty().WithMessage("Takım adı boş olamaz.")
      .MaximumLength(100).WithMessage("Takım adı en fazla 100 karakter olabilir.");

    RuleFor(s => s.Appearances)
      .GreaterThanOrEqualTo(0).WithMessage("Maça çıkma sayısı 0'dan küçük olamaz.");

    RuleFor(s => s.MinutesPlayed)
      .GreaterThanOrEqualTo(0).WithMessage("Oynanan dakika 0'dan küçük olamaz.");

    RuleFor(s => s.Goals)
      .GreaterThanOrEqualTo(0).WithMessage("Gol sayısı 0'dan küçük olamaz.");

    RuleFor(s => s.Assists)
      .GreaterThanOrEqualTo(0).WithMessage("Asist sayısı 0'dan küçük olamaz.");

    RuleFor(s => s.YellowCards)
      .GreaterThanOrEqualTo(0).WithMessage("Sarı kart sayısı 0'dan küçük olamaz.");

    RuleFor(s => s.RedCards)
      .GreaterThanOrEqualTo(0).WithMessage("Kırmızı kart sayısı 0'dan küçük olamaz.");

    RuleFor(s => s.CleanSheets)
      .GreaterThanOrEqualTo(0).WithMessage("Gol yemeden bitirilen maç sayısı 0'dan küçük olamaz.");

    RuleFor(s => s.Saves)
      .GreaterThanOrEqualTo(0).WithMessage("Kurtarış sayısı 0'dan küçük olamaz.");

    RuleFor(s => s.GoalsConceded)
      .GreaterThanOrEqualTo(0).WithMessage("Yenilen gol sayısı 0'dan küçük olamaz.");

    RuleFor(s => s.PlayerId)
      .NotEmpty().WithMessage("Oyuncu ID boş olamaz.");

    RuleFor(s => s.SeasonId)
      .NotEmpty().WithMessage("Sezon ID boş olamaz.");
  }
}

public class UpdatePlayerStatsRequestValidator : AbstractValidator<UpdatePlayerStatsRequest>
{
  public UpdatePlayerStatsRequestValidator()
  {
    RuleFor(s => s.Id)
      .NotEmpty().WithMessage("Geçersiz istatistik ID.");

    RuleFor(s => s.Team)
      .NotEmpty().WithMessage("Takım adı boş olamaz.")
      .MaximumLength(100).WithMessage("Takım adı en fazla 100 karakter olabilir.");

    RuleFor(s => s.Appearances)
      .GreaterThanOrEqualTo(0).WithMessage("Maça çıkma sayısı 0'dan küçük olamaz.");

    RuleFor(s => s.MinutesPlayed)
      .GreaterThanOrEqualTo(0).WithMessage("Oynanan dakika 0'dan küçük olamaz.");

    RuleFor(s => s.Goals)
      .GreaterThanOrEqualTo(0).WithMessage("Gol sayısı 0'dan küçük olamaz.");

    RuleFor(s => s.Assists)
      .GreaterThanOrEqualTo(0).WithMessage("Asist sayısı 0'dan küçük olamaz.");

    RuleFor(s => s.YellowCards)
      .GreaterThanOrEqualTo(0).WithMessage("Sarı kart sayısı 0'dan küçük olamaz.");

    RuleFor(s => s.RedCards)
      .GreaterThanOrEqualTo(0).WithMessage("Kırmızı kart sayısı 0'dan küçük olamaz.");

    RuleFor(s => s.CleanSheets)
      .GreaterThanOrEqualTo(0).WithMessage("Gol yemeden bitirilen maç sayısı 0'dan küçük olamaz.");

    RuleFor(s => s.Saves)
      .GreaterThanOrEqualTo(0).WithMessage("Kurtarış sayısı 0'dan küçük olamaz.");

    RuleFor(s => s.GoalsConceded)
      .GreaterThanOrEqualTo(0).WithMessage("Yenilen gol sayısı 0'dan küçük olamaz.");

    RuleFor(s => s.PlayerId)
      .NotEmpty().WithMessage("Oyuncu ID boş olamaz.");

    RuleFor(s => s.SeasonId)
      .NotEmpty().WithMessage("Sezon ID boş olamaz.");
  }
}