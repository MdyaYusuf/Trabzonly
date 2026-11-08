using Microsoft.Extensions.DependencyInjection;

namespace Api.Features.MatchWeek;

public static class MatchWeekRegistration
{
  public static IServiceCollection AddMatchWeekDependencies(this IServiceCollection services)
  {
    services.AddScoped<IClubRepository, EfClubRepository>();
    services.AddScoped<IFixtureRepository, EfFixtureRepository>();
    services.AddScoped<ILeagueStandingRepository, EfLeagueStandingRepository>();
    services.AddScoped<IMatchWeekRepository, EfMatchWeekRepository>();
    services.AddScoped<IMatchWeekSlotRepository, EfMatchWeekSlotRepository>();
    services.AddScoped<IMatchWeekPlayerRatingRepository, EfMatchWeekPlayerRatingRepository>();

    services.AddScoped<FixtureBusinessRules>();
    services.AddScoped<StandingsSettler>();
    services.AddScoped<IClubService, ClubService>();
    services.AddScoped<IFixtureService, FixtureService>();
    services.AddScoped<ILeagueStandingService, LeagueStandingService>();

    return services;
  }
}
