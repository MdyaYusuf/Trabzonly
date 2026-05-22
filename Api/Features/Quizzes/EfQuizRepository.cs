using Api.Core.Repositories;
using Api.Data;

namespace Api.Features.Quizzes;

public class EfQuizRepository : EfBaseRepository<BaseDbContext, Quiz, Guid>, IQuizRepository
{
  public EfQuizRepository(BaseDbContext context) : base(context)
  {

  }
}