using Riok.Mapperly.Abstractions;

namespace Api.Features.Players;

[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.None)]
public partial class PlayerMapper
{
  public partial Player CreateToEntity(CreatePlayerRequest request);
  public partial void UpdateEntityFromRequest(UpdatePlayerRequest request, Player entity);

  [MapProperty("Position.Name", "PositionName")]
  [MapProperty("Position.Abbreviation", "PositionAbbreviation")]
  [MapperIgnoreTarget(nameof(PlayerResponseDto.CommentCount))]
  [MapperIgnoreTarget(nameof(PlayerResponseDto.CurrentSeasonStats))]
  [MapperIgnoreTarget(nameof(PlayerResponseDto.CurrentUserScore))]
  public partial PlayerResponseDto EntityToResponseDto(Player entity);

  public partial CreatedPlayerResponseDto EntityToCreatedResponseDto(Player entity);

  [MapProperty("Position.Name", "PositionName")]
  public partial PlayerPreviewDto EntityToPreviewDto(Player entity);
  public partial List<PlayerPreviewDto> EntityToPreviewDtoList(List<Player> entities);
}
