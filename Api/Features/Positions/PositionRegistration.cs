using Microsoft.Extensions.DependencyInjection;

namespace Api.Features.Positions;

public static class PositionRegistration
{
  public static IServiceCollection AddPositionDependencies(this IServiceCollection services)
  {
    services.AddScoped<IPositionRepository, EfPositionRepository>();
    services.AddScoped<IPositionRoleRepository, EfPositionRoleRepository>();
    services.AddScoped<PositionBusinessRules>();
    services.AddScoped<IPositionService, PositionService>();
    services.AddSingleton<PositionMapper>();

    return services;
  }
}
