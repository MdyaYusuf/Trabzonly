namespace Api.Features.Quizzes.Seed;

public static class QuizSeedManifest
{
  public static IReadOnlyList<QuizSeedPack> Packs { get; } =
  [
    new(
      "history-founding-colors-crest",
      QuizCategory.HistoryAndFirsts,
      "Kuruluş, Renkler ve Arma",
      "Birleşmeden bordo-maviye, arma ve ilk kupaya uzanan kuruluş hikâyesini test et.",
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 20]),
    new(
      "history-anadolu-coaches",
      QuizCategory.HistoryAndFirsts,
      "Anadolu İhtilali ve Teknik Adamlar",
      "Özyazıcı'dan Avcı'ya, Anadolu'ya ilk şampiyonluğu taşıyan teknik adamları ve sezonları soruyoruz.",
      [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]),
    new(
      "history-presidents",
      QuizCategory.HistoryAndFirsts,
      "Başkanlar ve Yönetim",
      "İlk başkandan bugüne kulüp yönetiminin unutulmaz isimlerini ve rekorlarını ölç.",
      [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]),
    new(
      "history-scorers-records",
      QuizCategory.HistoryAndFirsts,
      "Gol Kralları ve Rekorlar",
      "Hami'den sezon krallarına, kaleci ve şut rekorlarına kadar filelere yazılan efsaneler.",
      [31, 32, 33, 34, 35, 36, 37, 38, 39, 40]),
    new(
      "history-europe-victories",
      QuizCategory.HistoryAndFirsts,
      "Avrupa'da Tarihi Zaferler",
      "Liverpool'dan Inter'e, Avni Aker'de yazılan Avrupa gecelerini ne kadar hatırlıyorsun?",
      [41, 42, 43, 44, 45, 46, 47, 48, 49, 50]),

    new(
      "facilities-stadiums",
      QuizCategory.FacilitiesAndRecords,
      "Avni Aker'den Akyazı'ya",
      "Eski stadın ruhundan Şenol Güneş Spor Kompleksi'ne tesis ve saha bilgini sına.",
      [55, 56, 57, 58, 59, 60, 61, 64, 65, 66]),
    new(
      "facilities-culture-memory",
      QuizCategory.FacilitiesAndRecords,
      "Marş, Maskot ve Hafıza",
      "Maskot, marş, Onur Üyeliği ve Karadeniz futbol hafızasından 10 soruluk kültür testi.",
      [62, 63, 67, 70, 71, 72, 73, 74, 75, 76]),
    new(
      "facilities-hayri-gur-presidents",
      QuizCategory.FacilitiesAndRecords,
      "Hayri Gür'den Başkanlık İzlerine",
      "İlk teknik direktörden kurucu izlere ve başkanlık dönemlerine uzanan kişisel tarihler.",
      [51, 52, 53, 54, 68, 69, 77, 78, 79, 80]),
    new(
      "facilities-golden-age-defense",
      QuizCategory.FacilitiesAndRecords,
      "Altın Çağın Savunma Rekorları",
      "En iyi defans, yenilmezlik serileri ve altın çağın kırılması güç rekorları.",
      [81, 82, 83, 84, 85, 86, 87, 88, 89, 90]),
    new(
      "facilities-modern-hami",
      QuizCategory.FacilitiesAndRecords,
      "Modern Dönem ve Hami",
      "2000'ler krizleri, kupa dönüşleri ve Hami Mandıralı efsanesinden kesitler.",
      [91, 92, 93, 94, 95, 96, 97, 98, 99, 100]),

    new(
      "rivalry-first-meetings",
      QuizCategory.EternalRivalry,
      "İlk Randevular",
      "Büyüklerle ilk maç, ilk gol ve ilk galibiyetlerin izini sür.",
      [101, 102, 103, 119, 120, 121, 122, 123, 135, 136]),
    new(
      "rivalry-cup-finals",
      QuizCategory.EternalRivalry,
      "Kupa Finalleri",
      "Cumhurbaşkanlığı'ndan Türkiye Kupası'na ezeli rakiplerle final geceleri.",
      [110, 111, 113, 124, 125, 127, 137, 138, 139, 140]),
    new(
      "rivalry-unforgettable-nights",
      QuizCategory.EternalRivalry,
      "Unutulmaz Geceler",
      "5-3'ler, 4-0'lar, Yağmur maçı ve son dakika efsaneleri.",
      [105, 106, 107, 112, 116, 118, 126, 128, 145, 148]),
    new(
      "rivalry-derby-scorers",
      QuizCategory.EternalRivalry,
      "Derbi Golcüleri",
      "Derbilerde fileleri havalandıran isimler ve her iki formayla gol atanlar.",
      [104, 108, 114, 131, 132, 133, 143, 144, 146, 147]),
    new(
      "rivalry-records",
      QuizCategory.EternalRivalry,
      "Rekabetin Rekorları",
      "Seyirci, hasret, ortak yollar ve ezeli rekabetin istatistik rekorları.",
      [109, 115, 117, 129, 130, 134, 141, 142, 149, 150]),

    new(
      "championships-81-points",
      QuizCategory.ChampionshipsAndAchievements,
      "81 Puanlık Şampiyonluk",
      "2021-22'de 81 puanlık zirveyi ve şampiyonluk ilanını hatırlıyor musun?",
      [151, 152, 153, 154, 155, 156, 157, 158, 159, 160]),
    new(
      "championships-squad-matches",
      QuizCategory.ChampionshipsAndAchievements,
      "Şampiyonluk Kadrosu ve Maçları",
      "O sezonun yıldızları, kırılma maçları ve Süper Kupa zaferi.",
      [161, 162, 163, 164, 165, 166, 167, 168, 169, 170]),
    new(
      "championships-europe-record",
      QuizCategory.ChampionshipsAndAchievements,
      "Avrupa Karnesi",
      "Turnuva bilançoları, en farklı skorlar ve Avrupa'daki golcü rekorları.",
      [171, 172, 173, 174, 175, 176, 177, 178, 179, 180]),
    new(
      "championships-europe-museum",
      QuizCategory.ChampionshipsAndAchievements,
      "Avrupa Geceleri ve Müze",
      "Barcelona'dan Inter'e unutulmaz geceler; Şamil Ekinci Müzesi'nin kapısı.",
      [181, 182, 183, 184, 185, 186, 187, 188, 189, 190]),
    new(
      "championships-facilities-brotherhood",
      QuizCategory.ChampionshipsAndAchievements,
      "Tesis, Kardeşlik ve Rekorlar",
      "Kamp tesisleri, kardeş kulüpler, TS Club ve tribün rekorlarından seçki.",
      [191, 192, 193, 194, 195, 196, 197, 198, 199, 200]),
  ];
}
