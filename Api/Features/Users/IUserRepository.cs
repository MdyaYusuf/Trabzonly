using Api.Core.Repositories;

namespace Api.Features.Users;

public interface IUserRepository : IRepository<User, Guid>
{
  Task<bool> IsEmailUniqueAsync(
    string email,
    CancellationToken cancellationToken = default);

  Task<List<User>> GetTopContributorsAsync(
    int count,
    Func<IQueryable<User>, IQueryable<User>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);

  Task<List<User>> GetNewestMembersAsync(
    int count,
    Func<IQueryable<User>, IQueryable<User>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default);
}