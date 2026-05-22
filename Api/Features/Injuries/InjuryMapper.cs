using Riok.Mapperly.Abstractions;

namespace Api.Features.Injuries;

[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.None)]
public partial class InjuryMapper
{
  public partial Injury CreateToEntity(CreateInjuryRequest request);
  public partial void UpdateEntityFromRequest(UpdateInjuryRequest request, Injury entity);
  [MapProperty("Player.Name", "PlayerName")]
  [MapProperty("Season.Name", "SeasonName")]
  public partial InjuryResponseDto EntityToResponseDto(Injury entity);
  public partial List<InjuryResponseDto> EntityToResponseDtoList(List<Injury> entities);
}