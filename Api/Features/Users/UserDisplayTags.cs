namespace Api.Features.Users;

public static class UserDisplayTags
{
  public static readonly IReadOnlyList<string> Allowed =
  [
    "Kombine Sahibi",
    "Taktik Analisti",
    "Tribün Sesi"
  ];

  public static bool IsAllowed(string? tag)
  {
    if (string.IsNullOrWhiteSpace(tag))
    {
      return true;
    }

    return Allowed.Contains(tag.Trim(), StringComparer.Ordinal);
  }
}
