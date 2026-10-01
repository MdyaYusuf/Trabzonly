using Api.Core.Repositories;
using Api.Data;

namespace Api.Features.Polls;

public class EfPollRepository : EfBaseRepository<BaseDbContext, Poll, int>, IPollRepository
{
  public EfPollRepository(BaseDbContext context) : base(context)
  {
  }
}

public class EfPollOptionRepository : EfBaseRepository<BaseDbContext, PollOption, int>, IPollOptionRepository
{
  public EfPollOptionRepository(BaseDbContext context) : base(context)
  {
  }
}

public class EfPollVoteRepository : EfBaseRepository<BaseDbContext, PollVote, int>, IPollVoteRepository
{
  public EfPollVoteRepository(BaseDbContext context) : base(context)
  {
  }
}
