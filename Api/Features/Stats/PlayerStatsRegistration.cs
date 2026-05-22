using Microsoft.Extensions.DependencyInjection;

namespace Api.Features.Stats;

public static class PlayerStatsRegistration
{
  public static IServiceCollection AddPlayerStatsDependencies(this IServiceCollection services)
  {
    services.AddScoped<IPlayerStatsRepository, EfPlayerStatsRepository>();
    services.AddScoped<PlayerStatsBusinessRules>();
    services.AddScoped<IPlayerStatsService, PlayerStatsService>();
    services.AddSingleton<PlayerStatsMapper>();

    return services;
  }
}