using Api.Core.Repositories;
using Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.MatchWeek;

public class EfClubRepository : EfBaseRepository<BaseDbContext, Club, int>, IClubRepository
{
  public EfClubRepository(BaseDbContext context) : base(context)
  {
  }
}

public class EfFixtureRepository : EfBaseRepository<BaseDbContext, Fixture, int>, IFixtureRepository
{
  public EfFixtureRepository(BaseDbContext context) : base(context)
  {
  }
}

public class EfLeagueStandingRepository : EfBaseRepository<BaseDbContext, LeagueStanding, int>, ILeagueStandingRepository
{
  public EfLeagueStandingRepository(BaseDbContext context) : base(context)
  {
  }
}

public class EfMatchWeekRepository : EfBaseRepository<BaseDbContext, MatchWeek, int>, IMatchWeekRepository
{
  public EfMatchWeekRepository(BaseDbContext context) : base(context)
  {
  }

  public async Task<MatchWeek?> GetLatestForSeasonAsync(
    int seasonId,
    Func<IQueryable<MatchWeek>, IQueryable<MatchWeek>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    IQueryable<MatchWeek> query = Query(enableTracking);

    if (include != null)
    {
      query = include(query);
    }

    return await query
      .Where(matchWeek => matchWeek.SeasonId == seasonId)
      .OrderByDescending(matchWeek => matchWeek.Id)
      .FirstOrDefaultAsync(cancellationToken);
  }
}

public class EfMatchWeekSlotRepository : EfBaseRepository<BaseDbContext, MatchWeekSlot, int>, IMatchWeekSlotRepository
{
  public EfMatchWeekSlotRepository(BaseDbContext context) : base(context)
  {
  }
}

public class EfMatchWeekPlayerRatingRepository
  : EfBaseRepository<BaseDbContext, MatchWeekPlayerRating, int>, IMatchWeekPlayerRatingRepository
{
  public EfMatchWeekPlayerRatingRepository(BaseDbContext context) : base(context)
  {
  }
}
