using Riok.Mapperly.Abstractions;

namespace Api.Features.Positions;

[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.None)]
public partial class PositionMapper
{
  [MapperIgnoreTarget(nameof(Position.Roles))]
  public partial Position CreateToEntity(CreatePositionRequest request);

  [MapperIgnoreTarget(nameof(Position.Roles))]
  [MapperIgnoreSource(nameof(UpdatePositionRequest.Roles))]
  public partial void UpdateEntityFromRequest(UpdatePositionRequest request, Position entity);

  public partial PositionRoleResponseDto RoleToResponseDto(PositionRole role);

  public PositionResponseDto EntityToResponseDto(Position entity)
  {
    List<PositionRoleResponseDto> roles = entity.Roles
      .OrderBy(r => r.SortOrder)
      .ThenBy(r => r.Name)
      .Select(RoleToResponseDto)
      .ToList();

    return new PositionResponseDto(
      entity.Id,
      entity.Name,
      entity.Abbreviation,
      entity.Zone,
      entity.CreatedDate,
      entity.UpdatedDate,
      roles);
  }

  public List<PositionResponseDto> EntityToResponseDtoList(List<Position> entities)
  {
    return entities.Select(EntityToResponseDto).ToList();
  }
}
