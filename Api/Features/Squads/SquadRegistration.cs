namespace Api.Features.Squads;

public static class SquadRegistration
{
  public static IServiceCollection AddSquadDependencies(this IServiceCollection services)
  {
    services.AddScoped<ISquadRepository, EfSquadRepository>();
    services.AddScoped<ISquadSlotRepository, EfSquadSlotRepository>();
    services.AddScoped<ISquadRatingRepository, EfSquadRatingRepository>();
    services.AddScoped<SquadBusinessRules>();
    services.AddScoped<ISquadService, SquadService>();
    services.AddSingleton<SquadMapper>();

    return services;
  }
}
