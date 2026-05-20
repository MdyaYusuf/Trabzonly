using System.Diagnostics.CodeAnalysis;
using Api.Core.Entities;
using Api.Features.Blogs;
using Api.Features.Comments;
using Api.Features.Roles;
using Api.Features.Quizzes;

namespace Api.Features.Users;

public class User : Entity<Guid>
{
  [SetsRequiredMembers]
  public User()
  {
    Username = default!;
    Email = default!;
    PasswordHash = default!;
    PasswordKey = default!;
  }

  public required string Username { get; set; }
  public required string Email { get; set; }
  public required string PasswordHash { get; set; }
  public required string PasswordKey { get; set; }
  public string? RefreshToken { get; set; }
  public DateTime? RefreshTokenExpiration { get; set; }
  public string? ProfileImageUrl { get; set; }
  public string? Bio { get; set; }
  public bool IsActive { get; set; } = true;

  // Navigation properties
  public int RoleId { get; set; }
  public virtual Role Role { get; set; } = default!;
  public virtual ICollection<Blog> Blogs { get; set; } = new List<Blog>();
  public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
  public virtual ICollection<UserQuizResult> QuizResults { get; set; } = new List<UserQuizResult>();
}