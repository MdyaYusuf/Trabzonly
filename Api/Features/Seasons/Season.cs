using System.Diagnostics.CodeAnalysis;
using Api.Core.Entities;
using Api.Features.Injuries;
using Api.Features.Stats;
using MatchWeekEntity = Api.Features.MatchWeek.MatchWeek;
using MatchWeekFixture = Api.Features.MatchWeek.Fixture;
using MatchWeekStanding = Api.Features.MatchWeek.LeagueStanding;

namespace Api.Features.Seasons;

public class Season : Entity<int>
{
  [SetsRequiredMembers]
  public Season()
  {
    Name = default!;
  }

  public required string Name { get; set; }
  public DateTime StartDate { get; set; }
  public DateTime EndDate { get; set; }
  public bool IsActive { get; set; }
  public int DisplayedFixtureWeek { get; set; } = 1;

  // Navigation properties
  public virtual ICollection<Injury> Injuries { get; set; } = new List<Injury>();
  public virtual ICollection<PlayerStats> PlayerStats { get; set; } = new List<PlayerStats>();
  public virtual ICollection<MatchWeekFixture> Fixtures { get; set; } = new List<MatchWeekFixture>();
  public virtual ICollection<MatchWeekStanding> LeagueStandings { get; set; } = new List<MatchWeekStanding>();
  public virtual ICollection<MatchWeekEntity> MatchWeeks { get; set; } = new List<MatchWeekEntity>();
}
