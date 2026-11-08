using Api.Core.Exceptions;
using Api.Features.Seasons;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.MatchWeek;

public class FixtureBusinessRules(
  IFixtureRepository _fixtureRepository,
  ISeasonRepository _seasonRepository)
{
  public async Task<Fixture> GetFixtureIfExistAsync(
    int id,
    Func<IQueryable<Fixture>, IQueryable<Fixture>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    Fixture? fixture = await _fixtureRepository.GetByIdAsync(
      id,
      include,
      enableTracking,
      cancellationToken);

    if (fixture == null)
    {
      throw new NotFoundException($"{id} numaralı maç bulunamadı.");
    }

    return fixture;
  }

  public async Task<Season> GetSeasonIfExistAsync(
    int id,
    CancellationToken cancellationToken = default)
  {
    Season? season = await _seasonRepository.GetByIdAsync(
      id,
      enableTracking: false,
      cancellationToken: cancellationToken);

    if (season == null)
    {
      throw new NotFoundException($"{id} numaralı sezon bulunamadı.");
    }

    return season;
  }

  public async Task<Season> GetActiveSeasonIfExistAsync(CancellationToken cancellationToken = default)
  {
    Season? season = await _seasonRepository.GetAsync(
      predicate: s => s.IsActive,
      enableTracking: false,
      cancellationToken: cancellationToken);

    if (season == null)
    {
      throw new NotFoundException("Aktif sezon bulunamadı.");
    }

    return season;
  }

  public async Task<int> ResolveSeasonIdAsync(
    int? seasonId,
    CancellationToken cancellationToken = default)
  {
    if (seasonId.HasValue)
    {
      await GetSeasonIfExistAsync(seasonId.Value, cancellationToken);
      return seasonId.Value;
    }

    Season activeSeason = await GetActiveSeasonIfExistAsync(cancellationToken);
    return activeSeason.Id;
  }

  public void WeekNumberMustBeValid(int weekNumber)
  {
    if (weekNumber < 1 || weekNumber > 34)
    {
      throw new BusinessException("Hafta numarası 1 ile 34 arasında olmalıdır.");
    }
  }

  public void AdminRoleRequired(string userRole)
  {
    if (userRole != "Admin")
    {
      throw new ForbiddenException("Bu işlem için yetkiniz bulunmamaktadır.");
    }
  }

  public void FixturesMustBelongToWeek(
    IReadOnlyList<Fixture> fixtures,
    int seasonId,
    int weekNumber,
    IReadOnlyList<int> requestedIds)
  {
    HashSet<int> fixtureIds = fixtures.Select(f => f.Id).ToHashSet();

    foreach (int requestedId in requestedIds)
    {
      if (!fixtureIds.Contains(requestedId))
      {
        throw new BusinessException(
          $"{requestedId} numaralı maç {seasonId}. sezonun {weekNumber}. haftasına ait değil.");
      }
    }
  }

  public static Func<IQueryable<Fixture>, IQueryable<Fixture>> WithClubsInclude()
  {
    return query => query
      .Include(f => f.HomeClub)
      .Include(f => f.AwayClub);
  }
}
