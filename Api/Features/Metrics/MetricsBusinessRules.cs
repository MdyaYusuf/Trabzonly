using Api.Core.Exceptions;

namespace Api.Features.Metrics;

public class MetricsBusinessRules(IMetricsRepository _metricsRepository)
{
  public async Task<Metric> GetMetricIfExistAsync(
    Guid id,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    Metric? metric = await _metricsRepository.GetByIdAsync(
      id,
      enableTracking: enableTracking,
      cancellationToken: cancellationToken);

    if (metric == null)
    {
      throw new NotFoundException($"{id} numaralı metrik bulunamadı.");
    }

    return metric;
  }

  public async Task MetricKeyMustBeUniqueAsync(
    string key,
    Guid? id = null,
    CancellationToken cancellationToken = default)
  {
    bool exists = await _metricsRepository.AnyAsync(
      m => m.Key == key && (id == null || m.Id != id),
      cancellationToken);

    if (exists)
    {
      throw new BusinessException("Bu anahtara sahip bir metrik zaten mevcut.");
    }
  }
}
