namespace Api.Core.Security;

public static class ClientPlatform
{
  public const string HeaderName = "X-Client-Platform";
  public const string Web = "web";
  public const string Mobile = "mobile";

  public static bool IsMobile(HttpRequest request)
  {
    if (!request.Headers.TryGetValue(HeaderName, out var values))
    {
      return false;
    }

    string? platform = values.FirstOrDefault();

    if (string.IsNullOrWhiteSpace(platform))
    {
      return false;
    }

    return platform.Equals(Mobile, StringComparison.OrdinalIgnoreCase);
  }
}
