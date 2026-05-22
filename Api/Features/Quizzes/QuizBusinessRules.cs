using Api.Core.Exceptions;

namespace Api.Features.Quizzes;

public class QuizBusinessRules(IQuizRepository _quizRepository)
{
  public async Task<Quiz> GetQuizIfExistAsync(
    Guid id,
    Func<IQueryable<Quiz>, IQueryable<Quiz>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    var quiz = await _quizRepository.GetByIdAsync(id, include, enableTracking, cancellationToken);

    if (quiz == null)
    {
      throw new NotFoundException($"{id} numaralı quiz bulunamadı.");
    }

    return quiz;
  }

  public void AdminRoleRequired(string userRole)
  {
    if (userRole != "Admin")
    {
      throw new ForbiddenException("Bu işlem için yetkiniz bulunmamaktadır.");
    }
  }
}