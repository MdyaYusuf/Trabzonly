using Api.Core.Responses;

namespace Api.Features.MatchWeek;

public interface IFixtureService
{
  Task<ReturnModel<FixtureWeekResponseDto>> GetWeekAsync(
    int? seasonId,
    int weekNumber,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<FixtureResponseDto>> UpdateAsync(
    UpdateFixtureRequest request,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<FixtureWeekResponseDto>> UpdateWeekAsync(
    UpdateFixtureWeekRequest request,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<LeagueStandingsResponseDto>> RebuildStandingsAsync(
    int? seasonId,
    string userRole,
    CancellationToken cancellationToken = default);
}
