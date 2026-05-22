using Api.Core.Exceptions;

namespace Api.Features.Injuries;

public class InjuryBusinessRules(IInjuryRepository _injuryRepository)
{
  public async Task<Injury> GetInjuryIfExistAsync(
    Guid id,
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
      throw new ForbiddenException("Sakatlık işlemleri için yetkiniz bulunmamaktadır.");
  }
}