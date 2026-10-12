namespace Api.Features.Users;

public static class UserDisplayTags
{
  public const string Default = "Taraftarın Sesi";

  public static readonly IReadOnlyList<string> Allowed =
  [
    Default,
    "Kombine Sahibi",
    "Taktik Analisti",
    "Tribün Sesi"
  ];

  public static bool IsAllowed(string? tag)
  {
    if (string.IsNullOrWhiteSpace(tag))
    {
      return false;
    }

    return Allowed.Contains(tag.Trim(), StringComparer.Ordinal);
  }
}
