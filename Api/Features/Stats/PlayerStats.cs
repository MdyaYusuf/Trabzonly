using System.Diagnostics.CodeAnalysis;
using Api.Core.Entities;
using Api.Features.Players;
using Api.Features.Seasons;

namespace Api.Features.Stats;

public class PlayerStats : Entity<int>
{
  [SetsRequiredMembers]
  public PlayerStats()
  {
    Team = default!;
  }

  public required string Team { get; set; }
  public int Appearances { get; set; }
  public int MinutesPlayed { get; set; }
  public int Goals { get; set; }
  public int Assists { get; set; }
  public int YellowCards { get; set; }
  public int RedCards { get; set; }
  public int CleanSheets { get; set; }
  public int GoalsConceded { get; set; }

  // Navigation properties
  public int PlayerId { get; set; }
  public virtual Player Player { get; set; } = default!;
  public int SeasonId { get; set; }
  public virtual Season Season { get; set; } = default!;
}