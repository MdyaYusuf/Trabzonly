using System.Diagnostics.CodeAnalysis;
using Api.Core.Entities;

namespace Api.Features.Quizzes;

public class Answer : Entity<int>
{
  [SetsRequiredMembers]
  public Answer()
  {
    Text = default!;
  }

  public required string Text { get; set; }
  public bool IsCorrect { get; set; }

  // Navigation properties
  public int QuestionId { get; set; }
  public virtual Question Question { get; set; } = default!;
}
