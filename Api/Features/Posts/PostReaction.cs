using Api.Core.Entities;
using Api.Features.Users;

namespace Api.Features.Posts;

public class PostReaction : Entity<Guid>
{
  public PostReactionType Type { get; set; }

  public Guid UserId { get; set; }
  public virtual User User { get; set; } = default!;

  public Guid PostId { get; set; }
  public virtual Post Post { get; set; } = default!;
}
