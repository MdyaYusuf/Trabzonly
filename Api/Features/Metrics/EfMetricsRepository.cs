using Api.Core.Repositories;
using Api.Data;
using Api.Features.Posts;
using Api.Features.Squads;
using Api.Features.Users;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Metrics;

public class EfMetricsRepository : EfBaseRepository<BaseDbContext, Metric, Guid>, IMetricsRepository
{
  public EfMetricsRepository(BaseDbContext context) : base(context)
  {
  }

  public async Task<ShellMetricsCounts> GetShellCountsAsync(CancellationToken cancellationToken = default)
  {
    int activeUserCount = await _context.Set<User>()
      .AsNoTracking()
      .CountAsync(u => u.IsActive, cancellationToken);

    int totalPostCount = await _context.Set<Post>()
      .AsNoTracking()
      .CountAsync(p => p.IsActive, cancellationToken);

    int totalSquadCount = await _context.Set<Squad>()
      .AsNoTracking()
      .CountAsync(cancellationToken);

    return new ShellMetricsCounts(activeUserCount, totalPostCount, totalSquadCount);
  }
}
