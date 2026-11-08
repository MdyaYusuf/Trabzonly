using Api.Core.Responses;

namespace Api.Features.MatchWeek;

public class ClubService(IClubRepository _clubRepository) : IClubService
{
  public async Task<ReturnModel<List<ClubResponseDto>>> GetAllAsync(
    CancellationToken cancellationToken = default)
  {
    List<Club> clubs = await _clubRepository.GetAllAsync(
      orderBy: query => query
        .OrderByDescending(c => c.IsTrabzonspor)
        .ThenBy(c => c.Name),
      enableTracking: false,
      cancellationToken: cancellationToken);

    List<ClubResponseDto> response = clubs
      .Select(MapToResponse)
      .ToList();

    return new ReturnModel<List<ClubResponseDto>>()
    {
      Success = true,
      Message = "Kulüp listesi başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  private static ClubResponseDto MapToResponse(Club club)
  {
    return new ClubResponseDto(
      club.Id,
      club.Name,
      club.ShortName,
      club.IsTrabzonspor);
  }
}
