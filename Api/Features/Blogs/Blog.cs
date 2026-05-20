using System.Diagnostics.CodeAnalysis;
using Api.Core.Entities;
using Api.Features.Comments;
using Api.Features.Users;

namespace Api.Features.Blogs;

public class Blog : Entity<Guid>
{
  [SetsRequiredMembers]
  public Blog()
  {
    Title = default!;
    Content = default!;
  }

  public required string Title { get; set; }
  public string? Description { get; set; }
  public required string Content { get; set; }
  public string? ImageUrl { get; set; }
  public bool IsActive { get; set; } = true;

  // Navigation properties
  public Guid UserId { get; set; }
  public virtual User User { get; set; } = default!;
  public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
}