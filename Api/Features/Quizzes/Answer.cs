using System.Diagnostics.CodeAnalysis;
using Api.Core.Entities;

namespace Api.Features.Quizzes;

public class Answer : Entity<Guid>
{
  [SetsRequiredMembers]
  public Answer()
  {
    Text = default!;
  }

  public required string Text { get; set; }
  public bool IsCorrect { get; set; }

  // Navigation properties
  public Guid QuestionId { get; set; }
  public virtual Question Question { get; set; } = default!;
}