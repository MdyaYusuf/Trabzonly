using Microsoft.Extensions.DependencyInjection;

namespace Api.Features.Comments;

public static class CommentRegistration
{
  public static IServiceCollection AddCommentDependencies(this IServiceCollection services)
  {
    services.AddScoped<ICommentRepository, EfCommentRepository>();
    services.AddScoped<ICommentReactionRepository, EfCommentReactionRepository>();
    services.AddScoped<CommentBusinessRules>();
    services.AddScoped<ICommentService, CommentService>();
    services.AddSingleton<CommentMapper>();

    return services;
  }
}