using Api.Core.Repositories;

namespace Api.Features.Metrics;

public interface IMetricsRepository : IRepository<Metric, Guid>
{
  Task<ShellMetricsCounts> GetShellCountsAsync(CancellationToken cancellationToken = default);
}
