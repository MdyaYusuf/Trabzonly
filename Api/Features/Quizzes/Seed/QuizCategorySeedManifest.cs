namespace Api.Features.Quizzes.Seed;

public sealed record QuizCategorySeedDef(
  string SeedKey,
  string Name,
  string? Description);

public static class QuizCategorySeedManifest
{
  public const string HistoryAndFirsts = "history-and-firsts";
  public const string FacilitiesAndRecords = "facilities-and-records";
  public const string EternalRivalry = "eternal-rivalry";
  public const string ChampionshipsAndAchievements = "championships-and-achievements";

  public static IReadOnlyList<QuizCategorySeedDef> Categories { get; } =
  [
    new(
      HistoryAndFirsts,
      "Tarihçe ve İlkler",
      "Kuruluş, renkler, arma ve kulüp tarihinin ilkleri."),
    new(
      FacilitiesAndRecords,
      "Tesisler ve Rekorlar",
      "Stadyumlar, tesisler, marş, maskot ve kırılan rekorlar."),
    new(
      EternalRivalry,
      "Ezeli Rekabet",
      "Derbiler, finaller ve unutulmaz rekabet geceleri."),
    new(
      ChampionshipsAndAchievements,
      "Şampiyonluklar ve Başarılar",
      "Lig şampiyonlukları, Avrupa karnesi ve büyük başarılar."),
  ];
}
