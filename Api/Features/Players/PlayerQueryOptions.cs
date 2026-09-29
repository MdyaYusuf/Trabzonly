namespace Api.Features.Players;

public static class PlayerPositionGroups
{
  public const string All = "all";
  public const string Goalkeeper = "gk";
  public const string Defence = "def";
  public const string Midfield = "mid";
  public const string Forward = "fwd";

  public static readonly string[] GoalkeeperAbbreviations = ["GK"];
  public static readonly string[] DefenceAbbreviations = ["CB", "LB", "RB"];
  public static readonly string[] MidfieldAbbreviations = ["DM", "CM", "AM"];
  public static readonly string[] ForwardAbbreviations = ["LW", "RW", "ST"];

  public static string[]? GetAbbreviations(string? positionGroup)
  {
    if (string.IsNullOrWhiteSpace(positionGroup) || positionGroup == All)
    {
      return null;
    }

    return positionGroup.ToLowerInvariant() switch
    {
      Goalkeeper => GoalkeeperAbbreviations,
      Defence => DefenceAbbreviations,
      Midfield => MidfieldAbbreviations,
      Forward => ForwardAbbreviations,
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
