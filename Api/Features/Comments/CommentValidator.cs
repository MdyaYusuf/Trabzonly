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
      .Must(HaveExactlyOneTargetOrParent)
      .WithMessage("Yorum tam olarak bir post, oyuncu veya kadroya ait olmalıdır. Yanıtlar için üst yorum yeterlidir.");
  }

  private static bool HaveExactlyOneTargetOrParent(CreateCommentRequest request)
  {
    int targetCount = 0;

    if (request.PostId.HasValue)
    {
      targetCount++;
    }

    if (request.PlayerId.HasValue)
    {
      targetCount++;
    }

    if (request.SquadId.HasValue)
    {
      targetCount++;
    }

    if (request.ParentCommentId.HasValue)
    {
      return targetCount <= 1;
    }

    return targetCount == 1;
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
