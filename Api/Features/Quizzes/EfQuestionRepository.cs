using Api.Core.Repositories;
using Api.Data;

namespace Api.Features.Quizzes;

public class EfQuestionRepository : EfBaseRepository<BaseDbContext, Question, Guid>, IQuestionRepository
{
  public EfQuestionRepository(BaseDbContext context) : base(context)
  {

  }
}