namespace Api.Features.Seasons;

// Responses
public sealed record SeasonResponseDto(
  int Id,
  string Name,
  DateOnly StartDate,
  DateOnly EndDate,
  bool IsActive,
  int DisplayedFixtureWeek,
  DateTimeOffset CreatedDate,
  DateTimeOffset? UpdatedDate);

public sealed record SeasonAdminSummaryDto(
  int TotalCount,
  int ActiveCount,
  int InactiveCount);

// Requests
public sealed record CreateSeasonRequest(
  string Name,
  DateOnly StartDate,
  DateOnly EndDate,
  bool IsActive);

public sealed record UpdateSeasonRequest(
  int Id,
  string Name,
  DateOnly StartDate,
  DateOnly EndDate,
  bool IsActive);

public sealed record UpdateDisplayedFixtureWeekRequest(
  int SeasonId,
  int DisplayedFixtureWeek);

public sealed record SeasonAdminListQueryRequest(
  string? Search = null,
  bool? IsActive = null,
  string? Sort = null,
  int PageNumber = 1,
  int PageSize = 10);

public static class SeasonSortOptions
{
  public const string StartDesc = "start-desc";
  public const string StartAsc = "start-asc";
  public const string NameAsc = "name-asc";
}
