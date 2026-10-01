using Api.Core.Entities;
using Api.Features.Users;

namespace Api.Features.Polls;

public class PollVote : Entity<int>
{
  public Guid UserId { get; set; }
  public virtual User User { get; set; } = default!;

  public int PollId { get; set; }
  public virtual Poll Poll { get; set; } = default!;

  public int PollOptionId { get; set; }
  public virtual PollOption PollOption { get; set; } = default!;
}
