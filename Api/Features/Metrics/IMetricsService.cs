using Api.Core.Responses;

namespace Api.Features.Metrics;

public interface IMetricsService
{
  Task<ReturnModel<ShellMetricsDto>> GetShellMetricsAsync(
    CancellationToken cancellationToken = default);
}
