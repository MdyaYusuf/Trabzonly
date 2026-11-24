using Api.Core.Repositories;
using Api.Data;

namespace Api.Features.Quizzes;

public class EfUserQuizResultRepository : EfBaseRepository<BaseDbContext, UserQuizResult, int>, IUserQuizResultRepository
{
  public EfUserQuizResultRepository(BaseDbContext context) : base(context)
  {

  }
}