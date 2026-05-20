using System.Diagnostics.CodeAnalysis;
using Api.Core.Entities;
using Api.Features.Injuries;
using Api.Features.Stats;

namespace Api.Features.Seasons;

public class Season : Entity<Guid>
{
  [SetsRequiredMembers]
  public Season()
  {
    Name = default!;
  }

  public required string Name { get; set; }
  public DateTime StartDate { get; set; }
  public DateTime EndDate { get; set; }

  // Navigation properties
  public virtual ICollection<Injury> Injuries { get; set; } = new List<Injury>();
  public virtual ICollection<PlayerStats> PlayerStats { get; set; } = new List<PlayerStats>();
}