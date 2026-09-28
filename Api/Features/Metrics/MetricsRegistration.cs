namespace Api.Features.Metrics;

public static class MetricsRegistration
{
  public static IServiceCollection AddMetricsDependencies(this IServiceCollection services)
  {
    services.AddScoped<IMetricsRepository, EfMetricsRepository>();
    services.AddScoped<MetricsBusinessRules>();
    services.AddScoped<IMetricsService, MetricsService>();
    services.AddSingleton<MetricsMapper>();

    return services;
  }
}
