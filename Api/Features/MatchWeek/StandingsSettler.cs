using Api.Core.Repositories;
using Api.Features.Seasons;

namespace Api.Features.MatchWeek;

public class StandingsSettler(
  IClubRepository _clubRepository,
  IFixtureRepository _fixtureRepository,
  ILeagueStandingRepository _leagueStandingRepository,
  ISeasonRepository _seasonRepository,
  IUnitOfWork _unitOfWork)
{
  private sealed class ClubStats
  {
    public required int ClubId { get; init; }
    public int Played { get; set; }
    public int Won { get; set; }
    public int Drawn { get; set; }
    public int Lost { get; set; }
    public int GoalsFor { get; set; }
    public int GoalsAgainst { get; set; }
    public int Points { get; set; }
    public int GoalDifference => GoalsFor - GoalsAgainst;
  }

  public async Task RebuildForSeasonAsync(
    int seasonId,
    CancellationToken cancellationToken = default)
  {
    bool seasonExists = await _seasonRepository.AnyAsync(
      s => s.Id == seasonId,
      cancellationToken);

    if (!seasonExists)
    {
      throw new Api.Core.Exceptions.NotFoundException($"{seasonId} numaralı sezon bulunamadı.");
    }

    List<Club> clubs = await _clubRepository.GetAllAsync(
      orderBy: query => query.OrderBy(c => c.Id),
      enableTracking: false,
      cancellationToken: cancellationToken);

    List<Fixture> finishedFixtures = await _fixtureRepository.GetAllAsync(
      filter: f =>
        f.SeasonId == seasonId &&
        f.HomeScore.HasValue &&
        f.AwayScore.HasValue,
      enableTracking: false,
      cancellationToken: cancellationToken);

    Dictionary<int, ClubStats> statsByClubId = clubs.ToDictionary(
      club => club.Id,
      club => new ClubStats { ClubId = club.Id });

    foreach (Fixture fixture in finishedFixtures)
    {
      if (!statsByClubId.TryGetValue(fixture.HomeClubId, out ClubStats? homeStats) ||
          !statsByClubId.TryGetValue(fixture.AwayClubId, out ClubStats? awayStats))
      {
        continue;
      }

      int homeScore = fixture.HomeScore!.Value;
      int awayScore = fixture.AwayScore!.Value;

      ApplyResult(homeStats, goalsFor: homeScore, goalsAgainst: awayScore);
      ApplyResult(awayStats, goalsFor: awayScore, goalsAgainst: homeScore);
    }

    List<ClubStats> ranked = RankClubs(
      statsByClubId.Values.ToList(),
      finishedFixtures);

    List<LeagueStanding> existing = await _leagueStandingRepository.GetAllAsync(
      filter: s => s.SeasonId == seasonId,
      enableTracking: true,
      cancellationToken: cancellationToken);

    if (existing.Count > 0)
    {
      _leagueStandingRepository.DeleteRange(existing);
    }

    DateTime now = DateTime.Now;

    for (int index = 0; index < ranked.Count; index++)
    {
      ClubStats stats = ranked[index];

      await _leagueStandingRepository.AddAsync(
        new LeagueStanding
        {
          SeasonId = seasonId,
          ClubId = stats.ClubId,
          Played = stats.Played,
          Won = stats.Won,
          Drawn = stats.Drawn,
          Lost = stats.Lost,
          GoalsFor = stats.GoalsFor,
          GoalsAgainst = stats.GoalsAgainst,
          Points = stats.Points,
          Rank = index + 1,
          CreatedDate = now
        },
        cancellationToken);
    }

    await _unitOfWork.SaveChangesAsync(cancellationToken);
  }

  private static void ApplyResult(ClubStats stats, int goalsFor, int goalsAgainst)
  {
    stats.Played += 1;
    stats.GoalsFor += goalsFor;
    stats.GoalsAgainst += goalsAgainst;

    if (goalsFor > goalsAgainst)
    {
      stats.Won += 1;
      stats.Points += 3;
      return;
    }

    if (goalsFor == goalsAgainst)
    {
      stats.Drawn += 1;
      stats.Points += 1;
      return;
    }

    stats.Lost += 1;
  }

  private static List<ClubStats> RankClubs(
    List<ClubStats> allStats,
    List<Fixture> finishedFixtures)
  {
    List<ClubStats> ordered = new();

    foreach (IGrouping<int, ClubStats> pointsGroup in allStats
      .GroupBy(s => s.Points)
      .OrderByDescending(g => g.Key))
    {
      List<ClubStats> tied = pointsGroup.ToList();

      if (tied.Count == 1)
      {
        ordered.Add(tied[0]);
        continue;
      }

      if (tied.Count == 2)
      {
        ordered.AddRange(SortTwoClubTie(tied, finishedFixtures));
        continue;
      }

      ordered.AddRange(SortMiniTableTie(tied, finishedFixtures));
    }

    return ordered;
  }

  private static List<ClubStats> SortTwoClubTie(
    List<ClubStats> tied,
    List<Fixture> finishedFixtures)
  {
    ClubStats first = tied[0];
    ClubStats second = tied[1];
    HashSet<int> clubIds = new() { first.ClubId, second.ClubId };

    ClubStats h2hFirst = BuildSubsetStats(first.ClubId, clubIds, finishedFixtures);
    ClubStats h2hSecond = BuildSubsetStats(second.ClubId, clubIds, finishedFixtures);

    int comparison = CompareTiebreakers(
      left: first,
      right: second,
      leftSubset: h2hFirst,
      rightSubset: h2hSecond);

    if (comparison <= 0)
    {
      return [first, second];
    }

    return [second, first];
  }

  private static List<ClubStats> SortMiniTableTie(
    List<ClubStats> tied,
    List<Fixture> finishedFixtures)
  {
    HashSet<int> clubIds = tied.Select(s => s.ClubId).ToHashSet();

    Dictionary<int, ClubStats> miniByClubId = tied.ToDictionary(
      stats => stats.ClubId,
      stats => BuildSubsetStats(stats.ClubId, clubIds, finishedFixtures));

    return tied
      .OrderByDescending(stats => miniByClubId[stats.ClubId].Points)
      .ThenByDescending(stats => miniByClubId[stats.ClubId].GoalDifference)
      .ThenByDescending(stats => miniByClubId[stats.ClubId].GoalsFor)
      .ThenByDescending(stats => stats.GoalDifference)
      .ThenByDescending(stats => stats.GoalsFor)
      .ThenBy(stats => stats.ClubId)
      .ToList();
  }

  private static int CompareTiebreakers(
    ClubStats left,
    ClubStats right,
    ClubStats leftSubset,
    ClubStats rightSubset)
  {
    int subsetPoints = rightSubset.Points.CompareTo(leftSubset.Points);

    if (subsetPoints != 0)
    {
      return subsetPoints;
    }

    int subsetGoalDifference = rightSubset.GoalDifference.CompareTo(leftSubset.GoalDifference);

    if (subsetGoalDifference != 0)
    {
      return subsetGoalDifference;
    }

    int overallGoalDifference = right.GoalDifference.CompareTo(left.GoalDifference);

    if (overallGoalDifference != 0)
    {
      return overallGoalDifference;
    }

    int overallGoalsFor = right.GoalsFor.CompareTo(left.GoalsFor);

    if (overallGoalsFor != 0)
    {
      return overallGoalsFor;
    }

    return left.ClubId.CompareTo(right.ClubId);
  }

  private static ClubStats BuildSubsetStats(
    int clubId,
    HashSet<int> clubIds,
    List<Fixture> finishedFixtures)
  {
    ClubStats stats = new() { ClubId = clubId };

    foreach (Fixture fixture in finishedFixtures)
    {
      bool homeInSet = clubIds.Contains(fixture.HomeClubId);
      bool awayInSet = clubIds.Contains(fixture.AwayClubId);

      if (!homeInSet || !awayInSet)
      {
        continue;
      }

      if (fixture.HomeClubId == clubId)
      {
        ApplyResult(
          stats,
          goalsFor: fixture.HomeScore!.Value,
          goalsAgainst: fixture.AwayScore!.Value);
        continue;
      }

      if (fixture.AwayClubId == clubId)
      {
        ApplyResult(
          stats,
          goalsFor: fixture.AwayScore!.Value,
          goalsAgainst: fixture.HomeScore!.Value);
      }
    }

    return stats;
  }
}
