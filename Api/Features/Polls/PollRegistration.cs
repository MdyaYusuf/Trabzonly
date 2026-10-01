using Microsoft.Extensions.DependencyInjection;

namespace Api.Features.Polls;

public static class PollRegistration
{
  public static IServiceCollection AddPollDependencies(this IServiceCollection services)
  {
    services.AddScoped<IPollRepository, EfPollRepository>();
    services.AddScoped<IPollOptionRepository, EfPollOptionRepository>();
    services.AddScoped<IPollVoteRepository, EfPollVoteRepository>();
    services.AddScoped<PollBusinessRules>();
    services.AddScoped<IPollService, PollService>();

    return services;
  }
}
