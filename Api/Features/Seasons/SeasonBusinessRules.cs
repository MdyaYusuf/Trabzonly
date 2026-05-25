using Api.Core.Exceptions;

namespace Api.Features.Seasons;

public class SeasonBusinessRules(ISeasonRepository _seasonRepository)
{
  public async Task<Season> GetSeasonIfExistAsync(
    Guid id,
    Func<IQueryable<Season>, IQueryable<Season>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    var season = await _seasonRepository.GetByIdAsync(id, include, enableTracking, cancellationToken);

    if (season == null)
    {
      throw new NotFoundException($"{id} numaralı sezon bulunamadı.");
    }

    return season;
  }

  public void AdminRoleRequired(string userRole)
  {
    if (userRole != "Admin")
    {
      throw new ForbiddenException("Bu işlem için yetkiniz bulunmamaktadır.");
    }
  }

  public async Task SeasonNameCannotBeDuplicatedAsync(string name, CancellationToken cancellationToken = default)
  {
    bool exists = await _seasonRepository.AnyAsync(s => s.Name == name, cancellationToken);

    if (exists)
    {
      throw new BusinessException("Bu isme sahip bir sezon zaten mevcut.");
    }
  }

  public async Task SeasonNameCannotBeDuplicatedWhenUpdatedAsync(Guid id, string name, CancellationToken cancellationToken = default)
  {
    bool exists = await _seasonRepository.AnyAsync(s => s.Id != id && s.Name == name, cancellationToken);

    if (exists)
    {
      throw new BusinessException("Bu isme sahip başka bir sezon zaten mevcut.");
    }
  }

  public async Task SeasonDatesCannotOverlapAsync(DateTime startDate, DateTime endDate, Guid? idToIgnore = null, CancellationToken cancellationToken = default)
  {
    bool overlaps = await _seasonRepository.AnyAsync(
      s => (!idToIgnore.HasValue || s.Id != idToIgnore.Value) && startDate < s.EndDate && endDate > s.StartDate,
      cancellationToken);

    if (overlaps)
    {
      throw new BusinessException("Sezon tarihleri sistemde kayıtlı olan başka bir sezonun tarihleriyle çakışamaz.");
    }
  }
}