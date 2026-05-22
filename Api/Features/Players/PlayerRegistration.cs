using Microsoft.Extensions.DependencyInjection;

namespace Api.Features.Players;

public static class PlayerRegistration
{
  public static IServiceCollection AddPlayerDependencies(this IServiceCollection services)
  {
    services.AddScoped<IPlayerRepository, EfPlayerRepository>();
    services.AddScoped<PlayerBusinessRules>();
    services.AddScoped<IPlayerService, PlayerService>();
    services.AddSingleton<PlayerMapper>();

    return services;
  }
}