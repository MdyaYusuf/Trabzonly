using Microsoft.Extensions.DependencyInjection;

namespace Api.Features.Injuries;

public static class InjuryRegistration
{
  public static IServiceCollection AddInjuryDependencies(this IServiceCollection services)
  {
    services.AddScoped<IInjuryRepository, EfInjuryRepository>();
    services.AddScoped<InjuryBusinessRules>();
    services.AddScoped<IInjuryService, InjuryService>();
    services.AddSingleton<InjuryMapper>();

    return services;
  }
}