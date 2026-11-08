using Api.Core.Responses;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.MatchWeek;

public class LeagueStandingService(
  ILeagueStandingRepository _leagueStandingRepository,
  FixtureBusinessRules _businessRules) : ILeagueStandingService
{
  public async Task<ReturnModel<LeagueStandingsResponseDto>> GetBySeasonAsync(
    int? seasonId,
    CancellationToken cancellationToken = default)
  {
    int resolvedSeasonId = await _businessRules.ResolveSeasonIdAsync(
      seasonId,
      cancellationToken);

    List<LeagueStanding> standings = await _leagueStandingRepository.GetAllAsync(
      filter: s => s.SeasonId == resolvedSeasonId,
      include: query => query.Include(s => s.Club),
      orderBy: query => query.OrderBy(s => s.Rank),
      enableTracking: false,
      cancellationToken: cancellationToken);

    LeagueStandingsResponseDto response = new(
      resolvedSeasonId,
      standings.Select(MapToResponse).ToList());

    return new ReturnModel<LeagueStandingsResponseDto>()
    {
      Success = true,
      Message = "Puan durumu başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  internal static LeagueStandingResponseDto MapToResponse(LeagueStanding standing)
  {
    return new LeagueStandingResponseDto(
      standing.Id,
      standing.SeasonId,
      standing.ClubId,
      standing.Club.Name,
      standing.Club.ShortName,
      standing.Club.IsTrabzonspor,
      standing.Played,
      standing.Won,
      standing.Drawn,
      standing.Lost,
      standing.GoalsFor,
      standing.GoalsAgainst,
      standing.GoalsFor - standing.GoalsAgainst,
      standing.Points,
      standing.Rank);
  }
}
