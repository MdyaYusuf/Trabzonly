using System.Linq.Expressions;
using Api.Core.Repositories;
using Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Users;

public class EfUserRepository : EfBaseRepository<BaseDbContext, User, Guid>, IUserRepository
{
  public EfUserRepository(BaseDbContext context) : base(context)
  {
  }

  public async Task<(List<UserAdminListItemDto> Items, int TotalCount)> GetAdminPagedListAsync(
    Expression<Func<User, bool>>? filter = null,
    string? sort = null,
    int pageNumber = 1,
    int pageSize = 10,
    CancellationToken cancellationToken = default)
  {
    IQueryable<User> query = _context.Set<User>().AsNoTracking();

    if (filter != null)
    {
      query = query.Where(filter);
    }

    int totalCount = await query.CountAsync(cancellationToken);

    query = ApplyAdminSort(query, sort);

    List<UserAdminListItemDto> items = await query
      .Skip((pageNumber - 1) * pageSize)
      .Take(pageSize)
      .Select(user => new UserAdminListItemDto(
        user.Id,
        user.Username,
        user.Email,
        user.ProfileImageUrl,
        user.IsActive,
        user.CreatedDate,
        user.RoleId,
        user.Role.Name,
        user.Posts.Count(post => post.IsActive),
        user.Squads.Count))
      .ToListAsync(cancellationToken);

    return (items, totalCount);
  }

  public async Task<UserAdminDetailDto?> GetAdminDetailAsync(
    Guid id,
    CancellationToken cancellationToken = default)
  {
    return await _context.Set<User>()
      .AsNoTracking()
      .Where(user => user.Id == id)
      .Select(user => new UserAdminDetailDto(
        user.Id,
        user.Username,
        user.Email,
        user.Bio,
        user.DisplayTag,
        user.ProfileImageUrl,
        user.IsActive,
        user.CreatedDate,
        user.UpdatedDate,
        user.RoleId,
        user.Role.Name))
      .FirstOrDefaultAsync(cancellationToken);
  }

  private static IQueryable<User> ApplyAdminSort(IQueryable<User> query, string? sort)
  {
    string normalized = sort?.Trim().ToLowerInvariant() ?? UserAdminSortOptions.CreatedDesc;

    return normalized switch
    {
      UserAdminSortOptions.NameAsc => query
        .OrderBy(user => user.Username)
        .ThenByDescending(user => user.CreatedDate),
      _ => query
        .OrderByDescending(user => user.CreatedDate)
        .ThenBy(user => user.Username)
    };
  }
}
