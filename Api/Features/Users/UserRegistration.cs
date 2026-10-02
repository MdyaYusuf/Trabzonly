namespace Api.Features.Users;

public static class UserRegistration
{
  public static IServiceCollection AddUserDependencies(this IServiceCollection services)
  {
    services.AddScoped<IUserRepository, EfUserRepository>();
    services.AddScoped<IUserFollowRepository, EfUserFollowRepository>();
    services.AddScoped<UserBusinessRules>();
    services.AddScoped<IUserService, UserService>();
    services.AddSingleton<UserMapper>();

    return services;
  }
}