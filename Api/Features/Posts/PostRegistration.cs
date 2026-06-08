namespace Api.Features.Posts;

public static class PostRegistration
{
  public static IServiceCollection AddPostDependencies(this IServiceCollection services)
  {
    services.AddScoped<IPostRepository, EfPostRepository>();
    services.AddScoped<PostBusinessRules>();
    services.AddScoped<IPostService, PostService>();
    services.AddSingleton<PostMapper>();

    return services;
  }
}