using Api.Core.Repositories;
using Api.Data;

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
