using System.Diagnostics.CodeAnalysis;
using Api.Core.Entities;
using Api.Features.Players;

namespace Api.Features.MatchWeek;

public class MatchWeekSlot : Entity<int>
{
  [SetsRequiredMembers]
  public MatchWeekSlot()
  {
    SlotKey = default!;
  }

  public int MatchWeekId { get; set; }
  public virtual MatchWeek MatchWeek { get; set; } = default!;

  public int PlayerId { get; set; }
  public virtual Player Player { get; set; } = default!;

  public required string SlotKey { get; set; }
  public bool IsStarter { get; set; }
  public int SortOrder { get; set; }
}
