using System.Diagnostics.CodeAnalysis;
using Api.Core.Entities;

namespace Api.Features.Metrics;

public class Metric : Entity<Guid>
{
  [SetsRequiredMembers]
  public Metric()
  {
    Key = default!;
    DisplayName = default!;
  }

  public required string Key { get; set; }
  public required string DisplayName { get; set; }
  public long Value { get; set; }
  public string? Description { get; set; }
}
