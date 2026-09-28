using Api.Core.Responses;

namespace Api.Features.Metrics;

public class MetricsService(
  IMetricsRepository _metricsRepository,
  MetricsMapper _mapper) : IMetricsService
{
  public async Task<ReturnModel<ShellMetricsDto>> GetShellMetricsAsync(
    CancellationToken cancellationToken = default)
  {
    ShellMetricsCounts counts = await _metricsRepository.GetShellCountsAsync(cancellationToken);
    ShellMetricsDto response = _mapper.CountsToShellDto(counts);

    return new ReturnModel<ShellMetricsDto>()
    {
      Success = true,
      StatusCode = 200,
      Message = "Topluluk metrikleri getirildi.",
      Data = response
    };
  }
}
