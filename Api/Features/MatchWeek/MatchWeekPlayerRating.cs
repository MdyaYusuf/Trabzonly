using Api.Core.Entities;
using Api.Features.Players;
using Api.Features.Users;

namespace Api.Features.MatchWeek;

public class MatchWeekPlayerRating : Entity<int>
{
  public int MatchWeekId { get; set; }
  public virtual MatchWeek MatchWeek { get; set; } = default!;

  public int PlayerId { get; set; }
  public virtual Player Player { get; set; } = default!;

  public Guid UserId { get; set; }
  public virtual User User { get; set; } = default!;

  public decimal Score { get; set; }
}
