using System.Diagnostics.CodeAnalysis;
using Api.Core.Entities;

namespace Api.Features.Polls;

public class PollOption : Entity<int>
{
  [SetsRequiredMembers]
  public PollOption()
  {
    Label = default!;
  }

  public required string Label { get; set; }
  public int SortOrder { get; set; }
  public int VoteCount { get; set; }

  public int PollId { get; set; }
  public virtual Poll Poll { get; set; } = default!;

  public virtual ICollection<PollVote> Votes { get; set; } = new List<PollVote>();
}
