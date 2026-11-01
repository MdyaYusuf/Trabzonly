using Api.Core.Exceptions;

namespace Api.Features.Seasons;

public class SeasonBusinessRules(ISeasonRepository _seasonRepository)
{
  public async Task<Season> GetSeasonIfExistAsync(
    int id,
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

  public async Task SeasonNameCannotBeDuplicatedWhenUpdatedAsync(int id, string name, CancellationToken cancellationToken = default)
  {
    bool exists = await _seasonRepository.AnyAsync(s => s.Id != id && s.Name == name, cancellationToken);

    if (exists)
    {
      throw new BusinessException("Bu isme sahip başka bir sezon zaten mevcut.");
    }
  }

  public async Task SeasonDatesCannotOverlapAsync(DateTime startDate, DateTime endDate, int? idToIgnore = null, CancellationToken cancellationToken = default)
  {
    bool overlaps = await _seasonRepository.AnyAsync(
      s => (!idToIgnore.HasValue || s.Id != idToIgnore.Value) && startDate < s.EndDate && endDate > s.StartDate,
      cancellationToken);

    if (overlaps)
    {
      throw new BusinessException("Sezon tarihleri sistemde kayıtlı olan başka bir sezonun tarihleriyle çakışamaz.");
    }
  }

  public void ActiveSeasonCannotBeDeleted(Season season)
  {
    if (season.IsActive)
    {
      throw new BusinessException("Aktif sezon silinemez. Önce başka bir sezonu aktif yapın.");
    }
  }

  public async Task LastActiveSeasonCannotBeDeactivatedAsync(
    Season season,
    bool requestedIsActive,
    CancellationToken cancellationToken = default)
  {
    if (!season.IsActive || requestedIsActive)
    {
      return;
    }

    bool otherActiveExists = await _seasonRepository.AnyAsync(
      s => s.Id != season.Id && s.IsActive,
      cancellationToken);

    if (!otherActiveExists)
    {
      throw new BusinessException(
        "En az bir aktif sezon olmalıdır. Önce başka bir sezonu aktif yapın.");
    }
  }

  public async Task<bool> IsFirstSeasonAsync(CancellationToken cancellationToken = default)
  {
    return !await _seasonRepository.AnyAsync(s => true, cancellationToken);
  }
}