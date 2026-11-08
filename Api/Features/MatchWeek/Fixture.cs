using Api.Core.Entities;
using Api.Features.Seasons;

namespace Api.Features.MatchWeek;

public class Fixture : Entity<int>
{
  public int SeasonId { get; set; }
  public virtual Season Season { get; set; } = default!;

  public int WeekNumber { get; set; }

  public int HomeClubId { get; set; }
  public virtual Club HomeClub { get; set; } = default!;

  public int AwayClubId { get; set; }
  public virtual Club AwayClub { get; set; } = default!;

  public DateTime? Kickoff { get; set; }
  public int? HomeScore { get; set; }
  public int? AwayScore { get; set; }
}
