using System.Diagnostics.CodeAnalysis;
using Api.Core.Entities;
using Api.Features.Players;

namespace Api.Features.Positions;

public class Position : Entity<int>
{
  [SetsRequiredMembers]
  public Position()
  {
    Name = default!;
    Abbreviation = default!;
  }

  public required string Name { get; set; }
  public required string Abbreviation { get; set; }
  public PositionZone Zone { get; set; }

  // Navigation properties
  public virtual ICollection<Player> Players { get; set; } = new List<Player>();
  public virtual ICollection<PositionRole> Roles { get; set; } = new List<PositionRole>();
}