using Api.Core.Repositories;

namespace Api.Features.MatchWeek;

public interface IClubRepository : IRepository<Club, int>
{
}

public interface IFixtureRepository : IRepository<Fixture, int>
{
}

public interface ILeagueStandingRepository : IRepository<LeagueStanding, int>
{
}

public interface IMatchWeekRepository : IRepository<MatchWeek, int>
{
  Task<MatchWeek?> GetLatestForSeasonAsync(
    int seasonId,
    Func<IQueryable<MatchWeek>, IQueryable<MatchWeek>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default);
}

public interface IMatchWeekSlotRepository : IRepository<MatchWeekSlot, int>
{
}

public interface IMatchWeekPlayerRatingRepository : IRepository<MatchWeekPlayerRating, int>
{
}
