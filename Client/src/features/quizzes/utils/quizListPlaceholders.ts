import type {
  DailyQuestion,
  LeaderboardEntry,
  QuizCategoryId,
  QuizFeatured,
  QuizListCard,
  QuizSortOption,
} from './quizListTypes'

export const PAGE_SIZE = 6
export const TOTAL_QUIZZES = 18

export const quizListStats = {
  totalQuizzes: '18 Test',
  totalSolves: '42.8B Katılım',
  avgSuccess: '%68 Oran',
  avgSuccessPercent: 68,
  weeklyChampion: 'Fırtına61',
  weeklyScore: '98 / 100',
  seasonLabel: '2024–2025',
}

export const quizCategoryTabs: { id: QuizCategoryId; label: string }[] = [
  { id: 'all', label: 'Tümü' },
  { id: 'popular', label: 'En Popülerler' },
  { id: 'championships', label: 'Efsane Şampiyonluklar' },
  { id: 'europe', label: 'Avrupa Fırtınası' },
  { id: 'squads', label: 'Kadrolar & Oyuncular' },
  { id: 'culture', label: 'Tribün & Karadeniz Kültürü' },
]

export const quizSortOptions: { id: QuizSortOption; label: string }[] = [
  { id: 'most-solved', label: 'En Çok Çözülenler' },
  { id: 'newest', label: 'En Yeniler' },
  { id: 'difficulty', label: 'Zorluk Derecesi' },
]

export const featuredQuiz: QuizFeatured = {
  id: 'featured-8',
  seriesNumber: '#8',
  seriesLabel: 'ŞAMPİYONLUK SEZONU ÖZEL SERİSİ',
  difficultyLabel: 'ZORLUK: ORTA',
  badge: '★ HAFTANIN EN ÇOK ÇÖZÜLEN QUİZİ',
  popularityLabel: 'POPÜLERLİK: 14.2B ÇÖZÜLME',
  title: '2021-2022 Şampiyonluk Sezonunu Ne Kadar Hatırlıyorsun?',
  excerpt:
    "Akyazı'da meşalelerin yandığı o tarihi sezonun gol kralları, kırılma anları, kritik deplasman zaferleri ve Abdullah Avcı'nın taktik hamlelerine dair 15 soruluk derin test.",
  questionCount: 15,
  durationMinutes: 8,
  pointsLabel: '+150 Tribün Puanı',
  rating: 4.9,
  ratingCount: 2840,
  friendsLabel: '12 arkadaşın çözdü',
  imageUrl: '/assets/posts/post-related-crowd.png',
}

export const placeholderQuizzes: QuizListCard[] = [
  {
    id: '1',
    title: "1975'ten Günümüze: İlk Anadolu İhtilali ve Şampiyonluklar",
    excerpt:
      'Ahmet Suat Özyazıcı ve Özkan Sümer dönemlerinin efsane kadroları, Dozer Cemil ve fırtınanın temelleri.',
    categoryId: 'championships',
    categoryLabel: 'EFSANE TARİH',
    categoryTone: 'primary-container',
    solvesLabel: '9.8B ÇÖZÜLME',
    difficulty: 'hard',
    difficultyLabel: 'ZORLUK: ZOR',
    questionCount: 12,
    durationMinutes: 6,
    participantsLabel: '9,840 Katılım',
    isPopular: true,
    imageTone: 'from-[#3a0014] via-[#5a0e27] to-[#1A040B]',
  },
  {
    id: '2',
    title: "Karadeniz'in Avrupa Fatihleri: Liverpool, Aston Villa, Inter Zaferleri",
    excerpt:
      "Avni Aker'in çimlerinde devleri deviren tarihi zaferlerin golcüleri ve efsane 90 dakikaları.",
    categoryId: 'europe',
    categoryLabel: 'AVRUPA DESTANI',
    categoryTone: 'secondary',
    solvesLabel: '7.6B ÇÖZÜLME',
    difficulty: 'advanced',
    difficultyLabel: 'İLERİ SEVİYE',
    questionCount: 10,
    durationMinutes: 5,
    participantsLabel: '7,610 Katılım',
    isPopular: true,
    imageTone: 'from-[#12648e] via-[#004c6e] to-[#1A040B]',
  },
  {
    id: '3',
    title: "Trabzonspor'un Unutulmaz Yabancı Golcüleri",
    excerpt:
      'Hami Mandıralı’dan Banza’ya uzanan çizgide Bordo-Mavi formayı giyen efsane forvetlerin gol oryantiringi.',
    categoryId: 'squads',
    categoryLabel: 'OYUNCU ARŞİVİ',
    categoryTone: 'primary',
    solvesLabel: '5.4B ÇÖZÜLME',
    difficulty: 'medium',
    difficultyLabel: 'ZORLUK: ORTA',
    questionCount: 14,
    durationMinutes: 7,
    participantsLabel: '5,420 Katılım',
    isPopular: true,
    imageTone: 'from-[#3f2900] via-[#5a0e27] to-[#12648e]',
  },
  {
    id: '4',
    title: 'Hüseyin Avni Aker ve Karadeniz Tribün Lugatı',
    excerpt:
      'Vira, Marşlar, meşale ritüelleri ve Akyazı’nın unutulmaz tezahüratlarından oluşan kültür testi.',
    categoryId: 'culture',
    categoryLabel: 'TRİBÜN KÜLTÜRÜ',
    categoryTone: 'tertiary',
    solvesLabel: '4.1B ÇÖZÜLME',
    difficulty: 'easy',
    difficultyLabel: 'ZORLUK: KOLAY',
    questionCount: 8,
    durationMinutes: 4,
    participantsLabel: '4,180 Katılım',
    imageTone: 'from-[#5a0e27] via-[#12648e] to-[#1A040B]',
  },
  {
    id: '5',
    title: '2024-2025 Kadrosunu Ne Kadar Tanıyorsun?',
    excerpt:
      'Güncel forma numaraları, mevkiler ve Akyazı’daki kritik roller üzerine kısa ama sert bir kontrol.',
    categoryId: 'squads',
    categoryLabel: 'GÜNCEL KADRO',
    categoryTone: 'secondary',
    solvesLabel: '6.2B ÇÖZÜLME',
    difficulty: 'medium',
    difficultyLabel: 'ZORLUK: ORTA',
    questionCount: 11,
    durationMinutes: 5,
    participantsLabel: '6,210 Katılım',
    isPopular: true,
    imageTone: 'from-[#004c6e] via-[#5a0e27] to-[#1A040B]',
  },
  {
    id: '6',
    title: 'Tarihi Derbiler & Karadeniz Fırtınası Zaferleri',
    excerpt:
      'Büyük üçler karşısında yazılan skorlar, unutulmaz derbi geceleri ve tribün efsaneleri.',
    categoryId: 'championships',
    categoryLabel: 'DERBİ ARŞİVİ',
    categoryTone: 'primary-container',
    solvesLabel: '8.0B ÇÖZÜLME',
    difficulty: 'hard',
    difficultyLabel: 'ZORLUK: ZOR',
    questionCount: 13,
    durationMinutes: 7,
    participantsLabel: '8,050 Katılım',
    isPopular: true,
    imageTone: 'from-[#1A040B] via-[#5a0e27] to-[#3a0014]',
  },
]

export const leaderboardEntries: LeaderboardEntry[] = [
  {
    rank: 1,
    username: 'BordoMaviFırtına',
    badge: 'Tarih Profesörü',
    verified: true,
    points: 1450,
  },
  {
    rank: 2,
    username: 'AkyazıKartalı',
    badge: 'Kıdemli Taraftar',
    points: 1380,
  },
  {
    rank: 3,
    username: 'DozerCemil61',
    badge: 'Efsane Takipçisi',
    points: 1290,
  },
  {
    rank: 4,
    username: 'ViraTrabzon',
    points: 1120,
    compact: true,
    pointsLabel: '1,120 P',
  },
  {
    rank: 5,
    username: 'KaradenizKaplanı',
    points: 1050,
    compact: true,
    pointsLabel: '1,050 P',
  },
]

export const badgeShowcase = [
  { icon: 'workspace_premium', label: 'Efsane Avcısı', tone: 'primary' as const },
  { icon: 'stadium', label: 'Avni Aker Ruhu', tone: 'secondary' as const },
  { icon: 'local_fire_department', label: '61. Dakika', tone: 'tertiary' as const },
]

export const dailyQuestion: DailyQuestion = {
  prompt:
    "Trabzonspor'un 1975-76 sezonunda ligdeki ilk şampiyonluk maçında galibiyet golünü kim atmıştı?",
  pointsLabel: '+25 Puan',
  options: [
    { id: 'a', label: 'A) Hüseyin Tok' },
    { id: 'b', label: 'B) Cemil Usta (Dozer)' },
    { id: 'c', label: 'C) Ali Kemal Denizci' },
  ],
}

export const difficultyRank: Record<string, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
  advanced: 4,
}
