using Microsoft.EntityFrameworkCore;
using Api.Core.Repositories;
using Api.Data;

namespace Api.Features.Users;

public class EfUserRepository : EfBaseRepository<BaseDbContext, User, Guid>, IUserRepository
{
  public EfUserRepository(BaseDbContext context) : base(context)
  {

  }

  public async Task<bool> IsEmailUniqueAsync(
    string email,
    CancellationToken cancellationToken = default)
  {
    return !await Query(enableTracking: false, withDeleted: true)
      .AnyAsync(u => u.Email == email, cancellationToken);
  }

  public async Task<List<User>> GetTopContributorsAsync(
    int count,
    Func<IQueryable<User>, IQueryable<User>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    IQueryable<User> query = Query(enableTracking, withDeleted);

    if (include != null)
    {
      query = include(query);
    }

    return await query
      .Where(u => u.IsActive)
      .OrderByDescending(u => u.Blogs.Count + u.Comments.Count)
      .Take(count)
      .ToListAsync(cancellationToken);
  }

  public async Task<List<User>> GetNewestMembersAsync(
    int count,
    Func<IQueryable<User>, IQueryable<User>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    IQueryable<User> query = Query(enableTracking, withDeleted);

    if (include != null)
    {
      query = include(query);
    }

    return await query
      .Where(u => u.IsActive)
      .OrderByDescending(u => u.CreatedDate)
      .Take(count)
      .ToListAsync(cancellationToken);
  }
}