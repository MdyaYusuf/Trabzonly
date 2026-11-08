using Api.Core.Repositories;
using Api.Core.Responses;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.MatchWeek;

public class FixtureService(
  IFixtureRepository _fixtureRepository,
  FixtureBusinessRules _businessRules,
  StandingsSettler _standingsSettler,
  ILeagueStandingRepository _leagueStandingRepository,
  IUnitOfWork _unitOfWork,
  IValidator<UpdateFixtureRequest> _updateValidator,
  IValidator<UpdateFixtureWeekRequest> _updateWeekValidator) : IFixtureService
{
  public async Task<ReturnModel<FixtureWeekResponseDto>> GetWeekAsync(
    int? seasonId,
    int weekNumber,
    CancellationToken cancellationToken = default)
  {
    _businessRules.WeekNumberMustBeValid(weekNumber);

    int resolvedSeasonId = await _businessRules.ResolveSeasonIdAsync(
      seasonId,
      cancellationToken);

    List<Fixture> fixtures = await _fixtureRepository.GetAllAsync(
      filter: f => f.SeasonId == resolvedSeasonId && f.WeekNumber == weekNumber,
      include: FixtureBusinessRules.WithClubsInclude(),
      orderBy: query => query
        .OrderBy(f => f.Kickoff == null)
        .ThenBy(f => f.Kickoff)
        .ThenBy(f => f.Id),
      enableTracking: false,
      cancellationToken: cancellationToken);

    return new ReturnModel<FixtureWeekResponseDto>()
    {
      Success = true,
      Message = "Hafta fikstürü başarılı bir şekilde getirildi.",
      Data = new FixtureWeekResponseDto(
        resolvedSeasonId,
        weekNumber,
        fixtures.Select(MapToResponse).ToList()),
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<FixtureResponseDto>> UpdateAsync(
    UpdateFixtureRequest request,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    _businessRules.AdminRoleRequired(userRole);

    var validationResult = await _updateValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    Fixture fixture = await _businessRules.GetFixtureIfExistAsync(
      request.Id,
      include: FixtureBusinessRules.WithClubsInclude(),
      enableTracking: true,
      cancellationToken: cancellationToken);

    bool scoresChanged =
      fixture.HomeScore != request.HomeScore ||
      fixture.AwayScore != request.AwayScore;

    fixture.Kickoff = request.Kickoff;
    fixture.HomeScore = request.HomeScore;
    fixture.AwayScore = request.AwayScore;
    fixture.UpdatedDate = DateTime.Now;

    _fixtureRepository.Update(fixture);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    if (scoresChanged)
    {
      await _standingsSettler.RebuildForSeasonAsync(fixture.SeasonId, cancellationToken);
    }

    return new ReturnModel<FixtureResponseDto>()
    {
      Success = true,
      Message = "Maç başarılı bir şekilde güncellendi.",
      Data = MapToResponse(fixture),
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<FixtureWeekResponseDto>> UpdateWeekAsync(
    UpdateFixtureWeekRequest request,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    _businessRules.AdminRoleRequired(userRole);

    var validationResult = await _updateWeekValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    await _businessRules.GetSeasonIfExistAsync(request.SeasonId, cancellationToken);

    List<Fixture> fixtures = await _fixtureRepository.GetAllAsync(
      filter: f => f.SeasonId == request.SeasonId && f.WeekNumber == request.WeekNumber,
      include: FixtureBusinessRules.WithClubsInclude(),
      orderBy: query => query.OrderBy(f => f.Id),
      enableTracking: true,
      cancellationToken: cancellationToken);

    _businessRules.FixturesMustBelongToWeek(
      fixtures,
      request.SeasonId,
      request.WeekNumber,
      request.Fixtures.Select(f => f.Id).ToList());

    Dictionary<int, Fixture> fixturesById = fixtures.ToDictionary(f => f.Id);
    bool scoresChanged = false;
    DateTime now = DateTime.Now;

    foreach (UpdateFixtureWeekItemRequest item in request.Fixtures)
    {
      Fixture fixture = fixturesById[item.Id];

      if (fixture.HomeScore != item.HomeScore || fixture.AwayScore != item.AwayScore)
      {
        scoresChanged = true;
      }

      fixture.Kickoff = item.Kickoff;
      fixture.HomeScore = item.HomeScore;
      fixture.AwayScore = item.AwayScore;
      fixture.UpdatedDate = now;
      _fixtureRepository.Update(fixture);
    }

    await _unitOfWork.SaveChangesAsync(cancellationToken);

    if (scoresChanged)
    {
      await _standingsSettler.RebuildForSeasonAsync(request.SeasonId, cancellationToken);
    }

    List<Fixture> refreshed = await _fixtureRepository.GetAllAsync(
      filter: f => f.SeasonId == request.SeasonId && f.WeekNumber == request.WeekNumber,
      include: FixtureBusinessRules.WithClubsInclude(),
      orderBy: query => query
        .OrderBy(f => f.Kickoff == null)
        .ThenBy(f => f.Kickoff)
        .ThenBy(f => f.Id),
      enableTracking: false,
      cancellationToken: cancellationToken);

    return new ReturnModel<FixtureWeekResponseDto>()
    {
      Success = true,
      Message = "Hafta fikstürü başarılı bir şekilde güncellendi.",
      Data = new FixtureWeekResponseDto(
        request.SeasonId,
        request.WeekNumber,
        refreshed.Select(MapToResponse).ToList()),
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<LeagueStandingsResponseDto>> RebuildStandingsAsync(
    int? seasonId,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    _businessRules.AdminRoleRequired(userRole);

    int resolvedSeasonId = await _businessRules.ResolveSeasonIdAsync(
      seasonId,
      cancellationToken);

    await _standingsSettler.RebuildForSeasonAsync(resolvedSeasonId, cancellationToken);

    List<LeagueStanding> standings = await _leagueStandingRepository.GetAllAsync(
      filter: s => s.SeasonId == resolvedSeasonId,
      include: query => query.Include(s => s.Club),
      orderBy: query => query.OrderBy(s => s.Rank),
      enableTracking: false,
      cancellationToken: cancellationToken);

    return new ReturnModel<LeagueStandingsResponseDto>()
    {
      Success = true,
      Message = "Puan durumu başarılı bir şekilde yeniden hesaplandı.",
      Data = new LeagueStandingsResponseDto(
        resolvedSeasonId,
        standings.Select(LeagueStandingService.MapToResponse).ToList()),
      StatusCode = 200
    };
  }

  private static FixtureResponseDto MapToResponse(Fixture fixture)
  {
    return new FixtureResponseDto(
      fixture.Id,
      fixture.SeasonId,
      fixture.WeekNumber,
      MapClub(fixture.HomeClub),
      MapClub(fixture.AwayClub),
      fixture.Kickoff,
      fixture.HomeScore,
      fixture.AwayScore);
  }

  private static FixtureClubDto MapClub(Club club)
  {
    return new FixtureClubDto(
      club.Id,
      club.Name,
      club.ShortName,
      club.IsTrabzonspor);
  }
}
