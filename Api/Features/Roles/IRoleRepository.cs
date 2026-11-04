using System.Linq.Expressions;
using Api.Core.Repositories;

namespace Api.Features.Roles;

public interface IRoleRepository : IRepository<Role, int>
{
  Task<List<RoleAdminListItemDto>> GetAdminListAsync(
    Expression<Func<Role, bool>>? filter = null,
    string? sort = null,
    CancellationToken cancellationToken = default);
}
