using FluentValidation;

namespace Api.Features.Comments;

public class CreateCommentRequestValidator : AbstractValidator<CreateCommentRequest>
{
  public CreateCommentRequestValidator()
  {
    RuleFor(c => c.Content)
      .NotEmpty().WithMessage("Yorum içeriği boş olamaz.")
      .MaximumLength(1000).WithMessage("Yorum içeriği en fazla 1000 karakter olabilir.");

    RuleFor(x => x)
      .Must(x => x.BlogId.HasValue || x.PlayerId.HasValue || x.ParentCommentId.HasValue)
      .WithMessage("Yorum bir blog, oyuncu veya başka bir yoruma ait olmalıdır.");
  }
}

public class UpdateCommentRequestValidator : AbstractValidator<UpdateCommentRequest>
{
  public UpdateCommentRequestValidator()
  {
    RuleFor(c => c.Id).NotEmpty().WithMessage("Geçersiz yorum ID.");

    RuleFor(c => c.Content)
      .NotEmpty().WithMessage("Yorum içeriği boş olamaz.")
      .MaximumLength(1000).WithMessage("Yorum içeriği en fazla 1000 karakter olabilir.");
  }
}