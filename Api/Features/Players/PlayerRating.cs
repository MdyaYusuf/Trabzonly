using Api.Core.Entities;
using Api.Features.Users;

namespace Api.Features.Players;

public class PlayerRating : Entity<Guid>
{
  public decimal Score { get; set; }

  public Guid PlayerId { get; set; }
  public virtual Player Player { get; set; } = default!;

  public Guid UserId { get; set; }
  public virtual User User { get; set; } = default!;
}
