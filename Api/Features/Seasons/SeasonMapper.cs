using Riok.Mapperly.Abstractions;

namespace Api.Features.Seasons;

[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.None)]
public partial class SeasonMapper
{
  public partial Season CreateToEntity(CreateSeasonRequest request);
  public partial void UpdateEntityFromRequest(UpdateSeasonRequest request, Season entity);
  public partial SeasonResponseDto EntityToResponseDto(Season entity);
  public partial List<SeasonResponseDto> EntityToResponseDtoList(List<Season> entities);
}