using Api.Core.Responses;

namespace Api.Features.Polls;

public interface IPollService
{
  Task<ReturnModel<PollResponseDto?>> GetActiveAsync(
    int? playerId,
    Guid? currentUserId = null,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<CreatedPollResponseDto>> AddAsync(
    CreatePollRequest request,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<NoData>> UpdateAsync(
    UpdatePollRequest request,
    string userRole,
    CancellationToken cancellationToken = default);

  Task<ReturnModel<PollResponseDto>> VoteAsync(
    int pollId,
    VotePollRequest request,
    Guid currentUserId,
    CancellationToken cancellationToken = default);
}
