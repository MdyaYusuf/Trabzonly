using Api.Core.Repositories;

namespace Api.Features.Polls;

public interface IPollRepository : IRepository<Poll, int>
{
}

public interface IPollOptionRepository : IRepository<PollOption, int>
{
}

public interface IPollVoteRepository : IRepository<PollVote, int>
{
}
