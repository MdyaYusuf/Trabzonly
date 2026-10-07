using Riok.Mapperly.Abstractions;

namespace Api.Features.Squads;

[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.None)]
public partial class SquadMapper
{
  public partial Squad CreateToEntity(CreateSquadRequest request);
  public partial void UpdateEntityFromRequest(UpdateSquadRequest request, Squad entity);

  [MapProperty("User.Username", "AuthorUsername")]
  [MapProperty("User.DisplayTag", "AuthorDisplayTag")]
  [MapperIgnoreTarget(nameof(SquadResponseDto.CurrentUserScore))]
  [MapperIgnoreTarget(nameof(SquadResponseDto.IsAuthorFollowedByCurrentUser))]
  [MapperIgnoreTarget(nameof(SquadResponseDto.Slots))]
  public partial SquadResponseDto EntityToResponseDto(Squad entity);

  public partial CreatedSquadResponseDto EntityToCreatedResponseDto(Squad entity);

  [MapProperty("User.Username", "AuthorUsername")]
  [MapProperty("User.DisplayTag", "AuthorDisplayTag")]
  [MapperIgnoreTarget(nameof(SquadPreviewDto.Slots))]
  public partial SquadPreviewDto EntityToPreviewDto(Squad entity);

  [MapProperty("Player.Name", "PlayerName")]
  [MapProperty("Player.ImageUrl", "PlayerImageUrl")]
  [MapProperty("Player.Position.Abbreviation", "PositionAbbreviation")]
  [MapProperty("Player.ShirtNumber", "PlayerShirtNumber")]
  [MapProperty("Player.Age", "Age")]
  [MapProperty("Player.MarketValue", "MarketValue")]
  public partial SquadSlotResponseDto SlotToResponseDto(SquadSlot slot);

  public partial List<SquadSlotResponseDto> SlotToResponseDtoList(List<SquadSlot> slots);

  public SquadResponseDto EntityToResponseDtoWithSlots(
    Squad entity,
    decimal? currentUserScore = null,
    bool isAuthorFollowedByCurrentUser = false)
  {
    var dto = EntityToResponseDto(entity);
    var orderedSlots = entity.Slots
      .OrderBy(s => s.SortOrder)
      .ThenBy(s => s.SlotKey)
      .ToList();

    return dto with
    {
      Slots = SlotToResponseDtoList(orderedSlots),
      CurrentUserScore = currentUserScore,
      IsAuthorFollowedByCurrentUser = isAuthorFollowedByCurrentUser
    };
  }

  public SquadPreviewDto EntityToPreviewDtoWithSlots(Squad entity)
  {
    var dto = EntityToPreviewDto(entity);
    var orderedSlots = entity.Slots
      .OrderBy(s => s.SortOrder)
      .ThenBy(s => s.SlotKey)
      .ToList();

    return dto with
    {
      Slots = SlotToResponseDtoList(orderedSlots)
    };
  }

  public List<SquadPreviewDto> EntityToPreviewDtoList(List<Squad> entities)
  {
    return entities.Select(EntityToPreviewDtoWithSlots).ToList();
  }

  public List<SquadResponseDto> EntityToResponseDtoListWithSlots(List<Squad> entities)
  {
    return entities.Select(entity => EntityToResponseDtoWithSlots(entity)).ToList();
  }
}
