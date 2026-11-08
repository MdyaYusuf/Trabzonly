using Api.Features.Squads;

namespace Api.Features.MatchWeek;

public static class MatchWeekTactics
{
  public const int StarterSlotCount = SquadTactics.StarterSlotCount;
  public const int MaxBenchSlotCount = 6;
  public const string DefaultFormation = "4-2-3-1";

  public static readonly string[] AllowedBenchSlotKeys =
  [
    "BENCH_1",
    "BENCH_2",
    "BENCH_3",
    "BENCH_4",
    "BENCH_5",
    "BENCH_6",
  ];

  public static bool IsBenchSlotKey(string slotKey)
  {
    return SquadTactics.IsBenchSlotKey(slotKey);
  }

  public static bool TryGetStarterSlotKeys(string formation, out string[] starterSlotKeys)
  {
    if (SquadTactics.FormationStarterSlotKeys.TryGetValue(formation, out string[]? keys) &&
        keys != null)
    {
      starterSlotKeys = keys;
      return true;
    }

    starterSlotKeys = [];
    return false;
  }
}
