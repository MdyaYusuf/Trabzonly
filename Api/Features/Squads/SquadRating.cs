using Api.Core.Entities;
using Api.Features.Users;

namespace Api.Features.Squads;

public class SquadRating : Entity<Guid>
{
  public int Score { get; set; }

  public Guid SquadId { get; set; }
  public virtual Squad Squad { get; set; } = default!;

  public Guid UserId { get; set; }
  public virtual User User { get; set; } = default!;
}
