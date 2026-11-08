using Api.Core.Entities;
using Api.Features.Seasons;

namespace Api.Features.MatchWeek;

public class LeagueStanding : Entity<int>
{
  public int SeasonId { get; set; }
  public virtual Season Season { get; set; } = default!;

  public int ClubId { get; set; }
  public virtual Club Club { get; set; } = default!;

  public int Played { get; set; }
  public int Won { get; set; }
  public int Drawn { get; set; }
  public int Lost { get; set; }
  public int GoalsFor { get; set; }
  public int GoalsAgainst { get; set; }
  public int Points { get; set; }
  public int Rank { get; set; }
}
