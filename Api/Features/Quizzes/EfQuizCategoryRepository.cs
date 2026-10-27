using Api.Core.Repositories;
using Api.Data;

namespace Api.Features.Quizzes;

public class EfQuizCategoryRepository : EfBaseRepository<BaseDbContext, QuizCategory, int>, IQuizCategoryRepository
{
  public EfQuizCategoryRepository(BaseDbContext context) : base(context)
  {
  }
}
