using FluentValidation;

namespace Api.Features.Posts;

public class CreatePostRequestValidator : AbstractValidator<CreatePostRequest>
{
  public CreatePostRequestValidator()
  {
    RuleFor(b => b.Title)
      .NotEmpty().WithMessage("Başlık boş olamaz.")
      .MaximumLength(200).WithMessage("Başlık en fazla 200 karakter olabilir.");

    RuleFor(b => b.Description)
      .MaximumLength(500).WithMessage("Açıklama en fazla 500 karakter olabilir.");

    RuleFor(b => b.Content)
      .NotEmpty().WithMessage("İçerik boş olamaz.");

    RuleFor(b => b.CategoryId)
      .GreaterThan(0).WithMessage("Kategori seçimi zorunludur.");

    When(b => b.Poll != null, () =>
    {
      RuleFor(b => b.Poll!.Question)
        .NotEmpty().WithMessage("Anket sorusu boş olamaz.")
        .MaximumLength(300).WithMessage("Anket sorusu en fazla 300 karakter olabilir.");

      RuleFor(b => b.Poll!.Options)
        .NotNull().WithMessage("Anket seçenekleri zorunludur.")
        .Must(options => options.Count(option => !string.IsNullOrWhiteSpace(option)) >= 2)
        .WithMessage("Anket en az 2 seçenek içermelidir.");

      RuleForEach(b => b.Poll!.Options)
        .Must(option => string.IsNullOrWhiteSpace(option) || option.Trim().Length <= 200)
        .WithMessage("Seçenek metni en fazla 200 karakter olabilir.");
    });
  }
}

public class UpdatePostRequestValidator : AbstractValidator<UpdatePostRequest>
{
  public UpdatePostRequestValidator()
  {
    RuleFor(b => b.Id)
      .NotEmpty().WithMessage("Geçersiz post ID.");

    RuleFor(b => b.Title)
      .NotEmpty().WithMessage("Başlık boş olamaz.")
      .MaximumLength(200).WithMessage("Başlık en fazla 200 karakter olabilir.");

    RuleFor(b => b.Description)
      .MaximumLength(500).WithMessage("Açıklama en fazla 500 karakter olabilir.");

    RuleFor(b => b.Content)
      .NotEmpty().WithMessage("İçerik boş olamaz.");

    RuleFor(b => b.CategoryId)
      .GreaterThan(0).WithMessage("Kategori seçimi zorunludur.");

    RuleFor(b => b)
      .Must(b => !(b.DeactivatePoll && b.Poll != null))
      .WithMessage("Anket ekleme ve kapatma aynı anda yapılamaz.");

    When(b => b.Poll != null, () =>
    {
      RuleFor(b => b.Poll!.Question)
        .NotEmpty().WithMessage("Anket sorusu boş olamaz.")
        .MaximumLength(300).WithMessage("Anket sorusu en fazla 300 karakter olabilir.");

      RuleFor(b => b.Poll!.Options)
        .NotNull().WithMessage("Anket seçenekleri zorunludur.")
        .Must(options => options.Count(option => !string.IsNullOrWhiteSpace(option)) >= 2)
        .WithMessage("Anket en az 2 seçenek içermelidir.");

      RuleForEach(b => b.Poll!.Options)
        .Must(option => string.IsNullOrWhiteSpace(option) || option.Trim().Length <= 200)
        .WithMessage("Seçenek metni en fazla 200 karakter olabilir.");
    });
  }
}
