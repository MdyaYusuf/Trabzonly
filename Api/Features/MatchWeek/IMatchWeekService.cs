using Api.Core.Responses;

namespace Api.Features.MatchWeek;

public interface IMatchWeekService
{
  Task<ReturnModel<MatchWeekResponseDto>> GetCurrentAsync(
    Guid? currentUserId = null,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<MatchWeekResponseDto>> SaveAsync(
    SaveMatchWeekRequest request,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<MatchWeekPlayerRatingResponseDto>> RatePlayerAsync(
    int playerId,
    RateMatchWeekPlayerRequest request,
    Guid currentUserId,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<MatchWeekLeaderboardResponseDto>> GetLeaderboardAsync(
    CancellationToken cancellationToken = default);
}
