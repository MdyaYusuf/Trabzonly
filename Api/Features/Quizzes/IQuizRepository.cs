using Api.Core.Repositories;

namespace Api.Features.Quizzes;

public interface IQuizRepository : IRepository<Quiz, Guid>
{

}