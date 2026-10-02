using Api.Core.Entities;

namespace Api.Features.Users;

public class UserFollow : Entity<Guid>
{
  public Guid FollowerId { get; set; }
  public virtual User Follower { get; set; } = default!;

  public Guid FollowingId { get; set; }
  public virtual User Following { get; set; } = default!;
}
