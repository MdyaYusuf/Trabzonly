using System.Diagnostics.CodeAnalysis;
using Api.Core.Entities;

namespace Api.Features.Positions;

public class PositionRole : Entity<int>
{
  [SetsRequiredMembers]
  public PositionRole()
  {
    Name = default!;
    Description = default!;
  }

  public required string Name { get; set; }
  public required string Description { get; set; }
  public int SortOrder { get; set; }

  public int PositionId { get; set; }
  public virtual Position Position { get; set; } = default!;
}
