using Microsoft.Extensions.DependencyInjection;

namespace Api.Features.Quizzes;

public static class QuizRegistration
{
  public static IServiceCollection AddQuizDependencies(this IServiceCollection services)
  {
    services.AddScoped<IQuizRepository, EfQuizRepository>();
    services.AddScoped<IQuestionRepository, EfQuestionRepository>();
    services.AddScoped<IAnswerRepository, EfAnswerRepository>();
    services.AddScoped<IUserQuizResultRepository, EfUserQuizResultRepository>();
    services.AddScoped<IQuizCategoryRepository, EfQuizCategoryRepository>();
    services.AddScoped<QuizBusinessRules>();
    services.AddScoped<QuizCategoryBusinessRules>();
    services.AddScoped<IQuizService, QuizService>();
    services.AddScoped<IQuizCategoryService, QuizCategoryService>();
    services.AddSingleton<QuizMapper>();
    services.AddSingleton<QuizCategoryMapper>();

    return services;
  }
}
