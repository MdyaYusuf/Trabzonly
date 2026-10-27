using System.Diagnostics.CodeAnalysis;
using Api.Core.Entities;

namespace Api.Features.Quizzes;

public class QuizCategory : Entity<int>
{
  [SetsRequiredMembers]
  public QuizCategory()
  {
    Name = default!;
  }

  public required string Name { get; set; }
  public string? Description { get; set; }
  public string? ImageUrl { get; set; }
  public string? SeedKey { get; set; }
  public bool IsActive { get; set; } = true;

  public virtual ICollection<Quiz> Quizzes { get; set; } = new List<Quiz>();
}
