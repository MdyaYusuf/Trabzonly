using System.Diagnostics.CodeAnalysis;
using Api.Core.Entities;
using Api.Features.Comments;
using Api.Features.Users;

namespace Api.Features.Squads;

public class Squad : Entity<Guid>
{
  [SetsRequiredMembers]
  public Squad()
  {
    Title = default!;
    Formation = default!;
    Notes = string.Empty;
  }

  public required string Title { get; set; }
  public required string Formation { get; set; }
  public required string Notes { get; set; } = string.Empty;
  public decimal AverageRating { get; set; }
  public int RatingCount { get; set; }
  public int ViewCount { get; set; }
  public int CommentCount { get; set; }

  public Guid UserId { get; set; }
  public virtual User User { get; set; } = default!;
  public virtual ICollection<SquadSlot> Slots { get; set; } = new List<SquadSlot>();
  public virtual ICollection<SquadRating> Ratings { get; set; } = new List<SquadRating>();
  public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
}
