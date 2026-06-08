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
  }
}