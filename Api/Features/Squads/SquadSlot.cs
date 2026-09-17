using System.Diagnostics.CodeAnalysis;
using Api.Core.Entities;
using Api.Features.Players;

namespace Api.Features.Squads;

public class SquadSlot : Entity<Guid>
{
  [SetsRequiredMembers]
  public SquadSlot()
  {
    SlotKey = default!;
  }

  public required string SlotKey { get; set; }
  public int SortOrder { get; set; }

  public Guid SquadId { get; set; }
  public virtual Squad Squad { get; set; } = default!;

  public Guid PlayerId { get; set; }
  public virtual Player Player { get; set; } = default!;
}
