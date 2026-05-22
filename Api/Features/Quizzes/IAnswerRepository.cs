using Api.Core.Repositories;

namespace Api.Features.Quizzes;

public interface IAnswerRepository : IRepository<Answer, Guid>
{

}