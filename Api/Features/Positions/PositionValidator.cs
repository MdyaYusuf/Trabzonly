using FluentValidation;

namespace Api.Features.Positions;

public class PositionRoleRequestValidator : AbstractValidator<PositionRoleRequest>
{
  public PositionRoleRequestValidator()
  {
    RuleFor(r => r.Name)
      .NotEmpty().WithMessage("Rol adı boş olamaz.")
      .MaximumLength(80).WithMessage("Rol adı en fazla 80 karakter olabilir.");

    RuleFor(r => r.Description)
      .NotEmpty().WithMessage("Rol açıklaması boş olamaz.")
      .MaximumLength(300).WithMessage("Rol açıklaması en fazla 300 karakter olabilir.");

    RuleFor(r => r.SortOrder)
      .GreaterThanOrEqualTo(0).WithMessage("Rol sırası 0 veya daha büyük olmalıdır.");

    RuleFor(r => r.Id)
      .GreaterThan(0)
      .When(r => r.Id.HasValue)
      .WithMessage("Geçersiz rol ID.");
  }
}

public class CreatePositionRequestValidator : AbstractValidator<CreatePositionRequest>
{
  public CreatePositionRequestValidator()
  {
    RuleFor(p => p.Name)
      .NotEmpty().WithMessage("Pozisyon adı boş olamaz.")
      .MaximumLength(50).WithMessage("Pozisyon adı en fazla 50 karakter olabilir.");

    RuleFor(p => p.Abbreviation)
      .NotEmpty().WithMessage("Kısaltma boş olamaz.")
      .MaximumLength(10).WithMessage("Kısaltma en fazla 10 karakter olabilir.");

    RuleFor(p => p.Zone)
      .IsInEnum().WithMessage("Geçersiz saha bölgesi.");

    RuleFor(p => p.Roles)
      .NotNull().WithMessage("Rol listesi zorunludur.");

    RuleForEach(p => p.Roles)
      .SetValidator(new PositionRoleRequestValidator());

    RuleFor(p => p.Roles)
      .Must(HaveUniqueRoleNames)
      .WithMessage("Aynı pozisyon içinde rol adları benzersiz olmalıdır.")
      .When(p => p.Roles != null);
  }

  private static bool HaveUniqueRoleNames(List<PositionRoleRequest> roles)
  {
    return roles
      .Select(r => r.Name.Trim())
      .Where(name => !string.IsNullOrWhiteSpace(name))
      .GroupBy(name => name, StringComparer.OrdinalIgnoreCase)
      .All(group => group.Count() == 1);
  }
}

public class UpdatePositionRequestValidator : AbstractValidator<UpdatePositionRequest>
{
  public UpdatePositionRequestValidator()
  {
    RuleFor(p => p.Id).GreaterThan(0).WithMessage("Geçersiz pozisyon ID.");

    RuleFor(p => p.Name)
      .NotEmpty().WithMessage("Pozisyon adı boş olamaz.")
      .MaximumLength(50).WithMessage("Pozisyon adı en fazla 50 karakter olabilir.");

    RuleFor(p => p.Abbreviation)
      .NotEmpty().WithMessage("Kısaltma boş olamaz.")
      .MaximumLength(10).WithMessage("Kısaltma en fazla 10 karakter olabilir.");

    RuleFor(p => p.Zone)
      .IsInEnum().WithMessage("Geçersiz saha bölgesi.");

    RuleFor(p => p.Roles)
      .NotNull().WithMessage("Rol listesi zorunludur.");

    RuleForEach(p => p.Roles)
      .SetValidator(new PositionRoleRequestValidator());

    RuleFor(p => p.Roles)
      .Must(HaveUniqueRoleNames)
      .WithMessage("Aynı pozisyon içinde rol adları benzersiz olmalıdır.")
      .When(p => p.Roles != null);

    RuleFor(p => p.Roles)
      .Must(HaveUniqueRoleIds)
      .WithMessage("Rol listesinde aynı rol ID birden fazla kez kullanılamaz.")
      .When(p => p.Roles != null);
  }

  private static bool HaveUniqueRoleNames(List<PositionRoleRequest> roles)
  {
    return roles
      .Select(r => r.Name.Trim())
      .Where(name => !string.IsNullOrWhiteSpace(name))
      .GroupBy(name => name, StringComparer.OrdinalIgnoreCase)
      .All(group => group.Count() == 1);
  }

  private static bool HaveUniqueRoleIds(List<PositionRoleRequest> roles)
  {
    return roles
      .Where(r => r.Id.HasValue)
      .GroupBy(r => r.Id!.Value)
      .All(group => group.Count() == 1);
  }
}
