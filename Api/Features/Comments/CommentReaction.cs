using Api.Core.Entities;
using Api.Features.Users;

namespace Api.Features.Comments;

public class CommentReaction : Entity<Guid>
{
  public CommentReactionType Type { get; set; }

  public Guid UserId { get; set; }
  public virtual User User { get; set; } = default!;

  public Guid CommentId { get; set; }
  public virtual Comment Comment { get; set; } = default!;
}
