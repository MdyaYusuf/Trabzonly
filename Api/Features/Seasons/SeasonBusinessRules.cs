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
}