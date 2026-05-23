using Microsoft.Extensions.DependencyInjection;

namespace Api.Features.Categories;

public static class CategoryRegistration
{
  public static IServiceCollection AddCategoryDependencies(this IServiceCollection services)
  {
    services.AddScoped<ICategoryRepository, EfCategoryRepository>();
    services.AddScoped<CategoryBusinessRules>();
    services.AddScoped<ICategoryService, CategoryService>();
    services.AddSingleton<CategoryMapper>();

    return services;
  }
}