using Riok.Mapperly.Abstractions;

namespace Api.Features.Stats;

[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.None)]
public partial class PlayerStatsMapper
{
  public partial PlayerStats CreateToEntity(CreatePlayerStatsRequest request);
  public partial void UpdateEntityFromRequest(UpdatePlayerStatsRequest request, PlayerStats entity);
  [MapProperty("Player.Name", "PlayerName")]
  [MapProperty("Season.Name", "SeasonName")]
  public partial PlayerStatsResponseDto EntityToResponseDto(PlayerStats entity);
  public partial CreatedPlayerStatsResponseDto EntityToCreatedResponseDto(PlayerStats entity);
  public partial List<PlayerStatsResponseDto> EntityToResponseDtoList(List<PlayerStats> entities);
}