using Api.Core.Repositories;
using Api.Data;

namespace Api.Features.Quizzes;

public class EfAnswerRepository : EfBaseRepository<BaseDbContext, Answer, Guid>, IAnswerRepository
{
  public EfAnswerRepository(BaseDbContext context) : base(context)
  {

  }
}