using Api.Core.Responses;

namespace Api.Features.MatchWeek;

public interface IMatchWeekService
{
  Task<ReturnModel<MatchWeekResponseDto>> GetCurrentAsync(
    CancellationToken cancellationToken = default);

  Task<ReturnModel<MatchWeekResponseDto>> SaveAsync(
    SaveMatchWeekRequest request,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<MatchWeekResponseDto>> StartNewWeekAsync(
    SaveMatchWeekRequest request,
    string userRole,
    CancellationToken cancellationToken = default);
}
