using Api.Core.Repositories;

namespace Api.Features.Users;

public interface IUserFollowRepository : IRepository<UserFollow, Guid>
{
}
