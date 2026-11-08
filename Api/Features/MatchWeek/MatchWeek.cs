using System.Diagnostics.CodeAnalysis;
using Api.Core.Entities;
using Api.Features.Seasons;

namespace Api.Features.MatchWeek;

public class MatchWeek : Entity<int>
{
  [SetsRequiredMembers]
  public MatchWeek()
  {
    Formation = default!;
  }

  public int SeasonId { get; set; }
  public virtual Season Season { get; set; } = default!;

  public required string Formation { get; set; }

  public int OpponentClubId { get; set; }
  public virtual Club OpponentClub { get; set; } = default!;

  public bool IsHome { get; set; } = true;
  public int? HomeScore { get; set; }
  public int? AwayScore { get; set; }

  public virtual ICollection<MatchWeekSlot> Slots { get; set; } = new List<MatchWeekSlot>();
  public virtual ICollection<MatchWeekPlayerRating> Ratings { get; set; } = new List<MatchWeekPlayerRating>();
}
