using Api.Core.Responses;

namespace Api.Features.MatchWeek;

public interface ILeagueStandingService
{
  Task<ReturnModel<LeagueStandingsResponseDto>> GetBySeasonAsync(
    int? seasonId,
    CancellationToken cancellationToken = default);
}
