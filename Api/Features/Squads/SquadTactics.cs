namespace Api.Features.Squads;

public static class SquadTactics
{
  public const int StarterSlotCount = 11;
  public const int BenchSlotCount = 10;
  public const int TotalSlotCount = StarterSlotCount + BenchSlotCount;
  public const int NotesMaxLength = 400;

  public static readonly string[] AttackStyles = ["Baskılı", "Dengeli", "Kontra"];
  public static readonly string[] DefenseLines = ["Yüksek", "Dengeli", "Derin"];
  public static readonly string[] Tempos = ["Yüksek", "Normal", "Düşük"];

  public static readonly IReadOnlyDictionary<string, string[]> FormationStarterSlotKeys =
    new Dictionary<string, string[]>(StringComparer.OrdinalIgnoreCase)
    {
      ["4-2-3-1"] = ["GK", "RB", "RCB", "LCB", "LB", "RDM", "LDM", "RW", "CAM", "LW", "ST"],
      ["4-3-3"] = ["GK", "RB", "RCB", "LCB", "LB", "RCM", "CM", "LCM", "RW", "LW", "ST"],
      ["4-3-1-2"] = ["GK", "RB", "RCB", "LCB", "LB", "RCM", "CM", "LCM", "CAM", "ST", "ST2"],
      ["4-1-4-1"] = ["GK", "RB", "RCB", "LCB", "LB", "CDM", "RM", "RCM", "LCM", "LM", "ST"],
      ["4-4-2"] = ["GK", "RB", "RCB", "LCB", "LB", "RM", "RCM", "LCM", "LM", "ST", "ST2"],
      ["4-4-1-1"] = ["GK", "RB", "RCB", "LCB", "LB", "RM", "RCM", "LCM", "LM", "CAM", "ST"],
      ["4-5-1"] = ["GK", "RB", "RCB", "LCB", "LB", "RM", "RCM", "CM", "LCM", "LM", "ST"],
      ["3-5-2"] = ["GK", "RCB", "CB", "LCB", "RWB", "RCM", "CM", "LCM", "LWB", "ST", "ST2"],
      ["3-4-3"] = ["GK", "RCB", "CB", "LCB", "RWB", "RCM", "LCM", "LWB", "RW", "LW", "ST"],
      ["3-4-1-2"] = ["GK", "RCB", "CB", "LCB", "RWB", "RCM", "LCM", "LWB", "CAM", "ST", "ST2"],
      ["3-4-2-1"] = ["GK", "RCB", "CB", "LCB", "RWB", "RCM", "LCM", "LWB", "RW", "LW", "ST"],
      ["5-3-2"] = ["GK", "RWB", "RCB", "CB", "LCB", "LWB", "RCM", "CM", "LCM", "ST", "ST2"],
    };

  public static readonly string[] BenchSlotKeys =
  [
    "BENCH_1",
    "BENCH_2",
    "BENCH_3",
    "BENCH_4",
    "BENCH_5",
    "BENCH_6",
    "BENCH_7",
    "BENCH_8",
    "BENCH_9",
    "BENCH_10",
  ];

  public static bool IsBenchSlotKey(string slotKey)
  {
    return slotKey.StartsWith("BENCH_", StringComparison.OrdinalIgnoreCase);
  }
}
