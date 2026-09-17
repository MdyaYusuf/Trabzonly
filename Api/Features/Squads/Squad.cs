using System.Diagnostics.CodeAnalysis;
using Api.Core.Entities;
using Api.Features.Users;

namespace Api.Features.Squads;

public class Squad : Entity<Guid>
{
  [SetsRequiredMembers]
  public Squad()
  {
    Title = default!;
    Formation = default!;
  }

  public required string Title { get; set; }
  public required string Formation { get; set; }
  public decimal AverageRating { get; set; }
  public int RatingCount { get; set; }

  public Guid UserId { get; set; }
  public virtual User User { get; set; } = default!;
  public virtual ICollection<SquadSlot> Slots { get; set; } = new List<SquadSlot>();
  public virtual ICollection<SquadRating> Ratings { get; set; } = new List<SquadRating>();
}
