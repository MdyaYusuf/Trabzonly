using System.Diagnostics.CodeAnalysis;
using Api.Core.Entities;
using Api.Features.Players;
using Api.Features.Posts;
using Api.Features.Users;

namespace Api.Features.Comments;

public class Comment : Entity<Guid>
{
  [SetsRequiredMembers]
  public Comment()
  {
    Content = default!;
  }

  public required string Content { get; set; }
  public bool IsApproved { get; set; } = true;

  // Navigation properties
  public Guid UserId { get; set; }
  public virtual User User { get; set; } = default!;
  public Guid? PostId { get; set; }
  public virtual Post? Post { get; set; }
  public Guid? PlayerId { get; set; }
  public virtual Player? Player { get; set; }
  public Guid? ParentCommentId { get; set; }
  public virtual Comment? ParentComment { get; set; }
  public virtual ICollection<Comment> Replies { get; set; } = new List<Comment>();
}