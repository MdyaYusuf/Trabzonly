using FluentValidation;

namespace Api.Features.Users;

public class UpdateUserRequestValidator : AbstractValidator<UpdateUserRequest>
{
  public UpdateUserRequestValidator()
  {
    RuleFor(u => u.Bio)
      .MaximumLength(User.BioMaxLength)
      .WithMessage($"Bio en fazla {User.BioMaxLength} karakter olabilir.");

    RuleFor(u => u.DisplayTag)
      .NotEmpty().WithMessage("Görünen etiket seçilmelidir.")
      .MaximumLength(50).WithMessage("Görünen etiket en fazla 50 karakter olabilir.")
      .Must(UserDisplayTags.IsAllowed)
      .WithMessage("Seçilen görünen etiket geçersiz.");
  }
}

public class ChangePasswordRequestValidator : AbstractValidator<ChangePasswordRequest>
{
  public ChangePasswordRequestValidator()
  {
    RuleFor(u => u.CurrentPassword)
      .NotEmpty().WithMessage("Mevcut şifrenizi giriniz.");

    RuleFor(u => u.NewPassword)
      .NotEmpty().WithMessage("Yeni şifre boş olamaz.")
      .MinimumLength(8).WithMessage("Yeni şifre en az 8 karakter olmalıdır.")
      .Matches(@"[A-Z]").WithMessage("Yeni şifre en az bir büyük harf içermelidir.")
      .Matches(@"[a-z]").WithMessage("Yeni şifre en az bir küçük harf içermelidir.")
      .Matches(@"[0-9]").WithMessage("Yeni şifre en az bir rakam içermelidir.")
      .NotEqual(u => u.CurrentPassword).WithMessage("Yeni şifre mevcut şifre ile aynı olamaz.");

    RuleFor(u => u.ConfirmNewPassword)
      .Equal(u => u.NewPassword).WithMessage("Şifreler eşleşmiyor.");
  }
}