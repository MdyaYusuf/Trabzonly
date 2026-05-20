using System.Diagnostics.CodeAnalysis;
using Api.Core.Entities;
using Api.Features.Players;

namespace Api.Features.Positions;

public class Position : Entity<Guid>
{
  [SetsRequiredMembers]
  public Position()
  {
    Name = default!;
    Abbreviation = default!;
  }

  public required string Name { get; set; }
  public required string Abbreviation { get; set; }

  // Navigation properties
  public virtual ICollection<Player> Players { get; set; } = new List<Player>();
}