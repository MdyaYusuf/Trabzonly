using System.Diagnostics.CodeAnalysis;
using Api.Core.Entities;
using Api.Features.Players;
using Api.Features.Posts;

namespace Api.Features.Polls;

public class Poll : Entity<int>
{
  [SetsRequiredMembers]
  public Poll()
  {
    Question = default!;
  }

  public required string Question { get; set; }
  public bool IsActive { get; set; } = true;

  public int? PlayerId { get; set; }
  public virtual Player? Player { get; set; }

  public Guid? PostId { get; set; }
  public virtual Post? Post { get; set; }

  public virtual ICollection<PollOption> Options { get; set; } = new List<PollOption>();
  public virtual ICollection<PollVote> Votes { get; set; } = new List<PollVote>();
}
