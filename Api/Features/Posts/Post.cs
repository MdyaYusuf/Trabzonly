using System.Diagnostics.CodeAnalysis;
using Api.Core.Entities;
using Api.Features.Comments;
using Api.Features.Users;
using Api.Features.Categories;

namespace Api.Features.Posts;

public class Post : Entity<Guid>
{
  [SetsRequiredMembers]
  public Post()
  {
    Title = default!;
    Content = default!;
  }

  public required string Title { get; set; }
  public string? Description { get; set; }
  public required string Content { get; set; }
  public string? ImageUrl { get; set; }
  public bool IsActive { get; set; } = true;
  public int LikeCount { get; set; } = 0;
  public int DislikeCount { get; set; } = 0;

  // Navigation properties
  public Guid UserId { get; set; }
  public virtual User User { get; set; } = default!;
  public int CategoryId { get; set; }
  public virtual Category Category { get; set; } = default!;
  public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
}