using System.Diagnostics.CodeAnalysis;
using Api.Core.Entities;

namespace Api.Features.Quizzes;

public class Question : Entity<Guid>
{
  [SetsRequiredMembers]
  public Question()
  {
    Text = default!;
  }

  public required string Text { get; set; }
  public int Points { get; set; } = 10;

  // Navigation properties
  public Guid QuizId { get; set; }
  public virtual Quiz Quiz { get; set; } = default!;
  public virtual ICollection<Answer> Answers { get; set; } = new List<Answer>();
}