using Api.Core.Entities;
using Api.Features.Users;

namespace Api.Features.Quizzes;

public class UserQuizResult : Entity<Guid>
{
  public int Score { get; set; }
  public TimeSpan CompletionTime { get; set; }
  public DateTime CompletedAt { get; set; }

  // Navigation properties
  public Guid UserId { get; set; }
  public virtual User User { get; set; } = default!;
  public Guid QuizId { get; set; }
  public virtual Quiz Quiz { get; set; } = default!;
}