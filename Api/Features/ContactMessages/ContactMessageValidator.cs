using FluentValidation;

namespace Api.Features.ContactMessages;

public class CreateContactMessageRequestValidator : AbstractValidator<CreateContactMessageRequest>
{
  public CreateContactMessageRequestValidator()
  {
    RuleFor(x => x.Message)
      .NotEmpty().WithMessage("Mesaj boş olamaz.")
      .MaximumLength(400).WithMessage("Mesaj en fazla 400 karakter olabilir.");
  }
}
