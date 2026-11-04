using System.Linq.Expressions;
using Api.Core.Repositories;

namespace Api.Features.Users;

public interface IUserRepository : IRepository<User, Guid>
{
  Task<(List<UserAdminListItemDto> Items, int TotalCount)> GetAdminPagedListAsync(
    Expression<Func<User, bool>>? filter = null,
    string? sort = null,
    int pageNumber = 1,
    int pageSize = 10,
    CancellationToken cancellationToken = default);

  Task<UserAdminDetailDto?> GetAdminDetailAsync(
    Guid id,
    CancellationToken cancellationToken = default);
}
