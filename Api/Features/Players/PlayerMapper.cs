using Riok.Mapperly.Abstractions;

namespace Api.Features.Players;

[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.None)]
public partial class PlayerMapper
{
  public partial Player CreateToEntity(CreatePlayerRequest request);
  public partial void UpdateEntityFromRequest(UpdatePlayerRequest request, Player entity);
  [MapProperty("Position.Name", "PositionName")]
  public partial PlayerResponseDto EntityToResponseDto(Player entity);
  public partial CreatedPlayerResponseDto EntityToCreatedResponseDto(Player entity);
  public partial List<PlayerResponseDto> EntityToResponseDtoList(List<Player> entities);

  [MapProperty("Position.Name", "PositionName")]
  public partial PlayerPreviewDto EntityToPreviewDto(Player entity);
  public partial List<PlayerPreviewDto> EntityToPreviewDtoList(List<Player> entities);
}