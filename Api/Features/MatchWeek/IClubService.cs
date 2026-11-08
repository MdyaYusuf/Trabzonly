using Api.Core.Responses;

namespace Api.Features.MatchWeek;

public interface IClubService
{
  Task<ReturnModel<List<ClubResponseDto>>> GetAllAsync(
    CancellationToken cancellationToken = default);
}
