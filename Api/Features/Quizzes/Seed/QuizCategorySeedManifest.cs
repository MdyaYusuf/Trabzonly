namespace Api.Features.Quizzes.Seed;

public sealed record QuizCategorySeedDef(
  string SeedKey,
  string Name,
  string? Description,
  string ImageUrl);

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
      "Kuruluş, renkler, arma ve kulüp tarihinin ilkleri.",
      "/assets/quiz-categories/history-and-firsts.png"),
    new(
      FacilitiesAndRecords,
      "Tesisler ve Rekorlar",
      "Stadyumlar, tesisler, marş, maskot ve kırılan rekorlar.",
      "/assets/quiz-categories/facilities-and-records.png"),
    new(
      EternalRivalry,
      "Ezeli Rekabet",
      "Derbiler, finaller ve unutulmaz rekabet geceleri.",
      "/assets/quiz-categories/eternal-rivalry.png"),
    new(
      ChampionshipsAndAchievements,
      "Şampiyonluklar ve Başarılar",
      "Lig şampiyonlukları, Avrupa karnesi ve büyük başarılar.",
      "/assets/quiz-categories/championships-and-achievements.png"),
  ];
}
