namespace Api.Features.Metrics;

public sealed record ShellMetricsCounts(
  int ActiveUserCount,
  int TotalPostCount,
  int TotalSquadCount);

public sealed record ShellMetricsDto(
  int ActiveUserCount,
  int TotalPostCount,
  int TotalSquadCount);

public sealed record MetricResponseDto(
  Guid Id,
  string Key,
  string DisplayName,
  long Value,
  string? Description,
  DateTime CreatedDate,
  DateTime? UpdatedDate);
