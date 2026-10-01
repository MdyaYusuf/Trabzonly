using System.Diagnostics.CodeAnalysis;
using Api.Core.Entities;
using Api.Features.Players;
using Api.Features.Seasons;

namespace Api.Features.Injuries;

public class Injury : Entity<int>
{
  [SetsRequiredMembers]
  public Injury()
  {
    Name = default!;
  }

  public required string Name { get; set; }
  public int DaysInjured { get; set; }
  public int GamesMissed { get; set; }

  // Navigation properties
  public int PlayerId { get; set; }
  public virtual Player Player { get; set; } = default!;
  public int? SeasonId { get; set; }
  public virtual Season? Season { get; set; }
}