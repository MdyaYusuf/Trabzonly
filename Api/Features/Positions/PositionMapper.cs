using Riok.Mapperly.Abstractions;

namespace Api.Features.Positions;

[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.None)]
public partial class PositionMapper
{
  public partial Position CreateToEntity(CreatePositionRequest request);
  public partial void UpdateEntityFromRequest(UpdatePositionRequest request, Position entity);
  public partial PositionResponseDto EntityToResponseDto(Position entity);
  public partial List<PositionResponseDto> EntityToResponseDtoList(List<Position> entities);
}