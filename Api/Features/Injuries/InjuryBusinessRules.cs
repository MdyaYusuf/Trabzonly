using Api.Core.Exceptions;

namespace Api.Features.Injuries;

public class InjuryBusinessRules(IInjuryRepository _injuryRepository)
{
  public async Task<Injury> GetInjuryIfExistAsync(
    int id,
    Func<IQueryable<Injury>, IQueryable<Injury>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    var injury = await _injuryRepository.GetByIdAsync(id, include, enableTracking, cancellationToken);

    if (injury == null)
    {
      throw new NotFoundException($"{id} numaralı sakatlık bulunamadı.");
    }

    return injury;
  }

  public void AdminRoleRequired(string userRole)
  {
    if (userRole != "Admin")
    {
      throw new ForbiddenException("Sakatlık işlemleri için yetkiniz bulunmamaktadır.");
    }
  }

  public void InjuryMustBeLogicallyValid(int daysInjured, int gamesMissed)
  {
    if (gamesMissed > daysInjured)
    {
      throw new BusinessException("Kaçırılan maç sayısı, sakat kalınan gün sayısından fazla olamaz. Mantıksal olarak bir oyuncu günde 1'den fazla maç kaçıramaz.");
    }
  }

  public async Task InjuryCannotBeDuplicatedAsync(
    int playerId, int? seasonId, string name, int daysInjured, int gamesMissed, CancellationToken cancellationToken = default)
  {
    bool exists = await _injuryRepository.AnyAsync(
      i => i.PlayerId == playerId &&
           i.SeasonId == seasonId &&
           i.Name == name &&
           i.DaysInjured == daysInjured &&
           i.GamesMissed == gamesMissed,
      cancellationToken);

    if (exists)
    {
      throw new BusinessException("Bu sakatlık kaydı sistemde zaten mevcut. Lütfen yinelenen kayıt yapmadığınızdan emin olun.");
    }
  }

  public async Task InjuryCannotBeDuplicatedWhenUpdatedAsync(
    int id, int playerId, int? seasonId, string name, int daysInjured, int gamesMissed, CancellationToken cancellationToken = default)
  {
    bool exists = await _injuryRepository.AnyAsync(
      i => i.Id != id &&
           i.PlayerId == playerId &&
           i.SeasonId == seasonId &&
           i.Name == name &&
           i.DaysInjured == daysInjured &&
           i.GamesMissed == gamesMissed,
      cancellationToken);

    if (exists)
    {
      throw new BusinessException("Bu sakatlık kaydının aynısı sistemde zaten mevcut.");
    }
  }
}