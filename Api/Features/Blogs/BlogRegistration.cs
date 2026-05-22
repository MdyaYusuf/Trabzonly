using Microsoft.Extensions.DependencyInjection;

namespace Api.Features.Blogs;

public static class BlogRegistration
{
  public static IServiceCollection AddBlogDependencies(this IServiceCollection services)
  {
    services.AddScoped<IBlogRepository, EfBlogRepository>();
    services.AddScoped<BlogBusinessRules>();
    services.AddScoped<IBlogService, BlogService>();
    services.AddSingleton<BlogMapper>();

    return services;
  }
}