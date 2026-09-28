using Riok.Mapperly.Abstractions;

namespace Api.Features.Metrics;

[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.None)]
public partial class MetricsMapper
{
  public partial ShellMetricsDto CountsToShellDto(ShellMetricsCounts counts);

  public partial MetricResponseDto EntityToResponseDto(Metric entity);

  public partial List<MetricResponseDto> EntityToResponseDtoList(List<Metric> entities);
}
