using System.Diagnostics.CodeAnalysis;
using Api.Core.Entities;

namespace Api.Features.Quizzes;

public class Quiz : Entity<Guid>
{
  [SetsRequiredMembers]
  public Quiz()
  {
    Title = default!;
  }

  public required string Title { get; set; }
  public string? Description { get; set; }
  public int QuizCategoryId { get; set; }
  public string? SeedKey { get; set; }
  public bool IsActive { get; set; } = true;

  public virtual QuizCategory QuizCategory { get; set; } = default!;
  public virtual ICollection<Question> Questions { get; set; } = new List<Question>();
  public virtual ICollection<UserQuizResult> UserQuizResults { get; set; } = new List<UserQuizResult>();
}
