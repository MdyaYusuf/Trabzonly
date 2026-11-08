using System.Diagnostics.CodeAnalysis;
using Api.Core.Entities;

namespace Api.Features.MatchWeek;

public class Club : Entity<int>
{
  [SetsRequiredMembers]
  public Club()
  {
    Name = default!;
  }

  public required string Name { get; set; }
  public string? ShortName { get; set; }
  public bool IsTrabzonspor { get; set; }

  public virtual ICollection<Fixture> HomeFixtures { get; set; } = new List<Fixture>();
  public virtual ICollection<Fixture> AwayFixtures { get; set; } = new List<Fixture>();
  public virtual ICollection<LeagueStanding> Standings { get; set; } = new List<LeagueStanding>();
  public virtual ICollection<MatchWeek> OpponentMatchWeeks { get; set; } = new List<MatchWeek>();
}
