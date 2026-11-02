using Api.Features.Positions;

namespace Api.Features.Players;

public static class PlayerPositionGroups
{
  public const string All = "all";
  public const string Goalkeeper = "gk";
  public const string Defence = "def";
  public const string Midfield = "mid";
  public const string Forward = "fwd";

  public static PositionZone? GetZone(string? positionGroup)
  {
    if (string.IsNullOrWhiteSpace(positionGroup) || positionGroup == All)
    {
      return null;
    }

    return positionGroup.ToLowerInvariant() switch
    {
      Goalkeeper => PositionZone.Goalkeeper,
      Defence => PositionZone.Defence,
      Midfield => PositionZone.Midfield,
      Forward => PositionZone.Attack,
      _ => null
    };
  }
}

public static class PlayerSortOptions
{
  public const string ValueDesc = "value-desc";
  public const string RatingDesc = "rating-desc";
  public const string NumberAsc = "number-asc";
  public const string AppsDesc = "apps-desc";
}
