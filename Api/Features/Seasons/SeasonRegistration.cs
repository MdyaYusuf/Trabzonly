using Microsoft.Extensions.DependencyInjection;

namespace Api.Features.Seasons;

public static class SeasonRegistration
{
  public static IServiceCollection AddSeasonDependencies(this IServiceCollection services)
  {
    services.AddScoped<ISeasonRepository, EfSeasonRepository>();
    services.AddScoped<SeasonBusinessRules>();
    services.AddScoped<ISeasonService, SeasonService>();
    services.AddSingleton<SeasonMapper>();

    return services;
  }
}