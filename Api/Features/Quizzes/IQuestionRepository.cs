using Api.Core.Repositories;

namespace Api.Features.Quizzes;

public interface IQuestionRepository : IRepository<Question, Guid>
{

}