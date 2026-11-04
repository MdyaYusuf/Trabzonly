using System.Linq.Expressions;
using Api.Core.Repositories;
using Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Roles;

public class EfRoleRepository : EfBaseRepository<BaseDbContext, Role, int>, IRoleRepository
{
  public EfRoleRepository(BaseDbContext context) : base(context)
  {
  }

  public async Task<List<RoleAdminListItemDto>> GetAdminListAsync(
    Expression<Func<Role, bool>>? filter = null,
    string? sort = null,
    CancellationToken cancellationToken = default)
  {
    IQueryable<Role> query = _context.Set<Role>().AsNoTracking();

    if (filter != null)
    {
      query = query.Where(filter);
    }

    query = ApplyAdminSort(query, sort);

    return await query
      .Select(role => new RoleAdminListItemDto(
        role.Id,
        role.Name,
        role.Users.Count,
        role.IsSystem,
        role.CreatedDate,
        role.UpdatedDate))
      .ToListAsync(cancellationToken);
  }

  private static IQueryable<Role> ApplyAdminSort(
    IQueryable<Role> query,
    string? sort)
  {
    string normalized = sort?.Trim().ToLowerInvariant() ?? RoleSortOptions.NameAsc;

    return normalized switch
    {
      RoleSortOptions.MembersAsc => query
        .OrderBy(role => role.Users.Count)
        .ThenBy(role => role.Name),
      RoleSortOptions.MembersDesc => query
        .OrderByDescending(role => role.Users.Count)
        .ThenBy(role => role.Name),
      _ => query
        .OrderBy(role => role.Name)
        .ThenBy(role => role.Id)
    };
  }
}
