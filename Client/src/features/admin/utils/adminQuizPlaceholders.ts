import type {
  AdminQuizCreateDraft,
  AdminQuizEditDraft,
  AdminQuizListRow,
} from './adminQuizTypes'

export const adminQuizListStats = {
  totalValue: '12 Test',
  totalNote: 'Arşiv ve yayında olanlar',
  archiveRate: '%33',
  activeValue: '8 Quiz',
  activeNote: 'Yayında, katılıma açık',
  capacity: 'Tam Kapasite',
  solvesValue: '46.280',
  solvesNote: 'Bu ay +8.410 taraftar katılımı',
  monthlyChange: '+%22.4',
  successValue: '%71.4',
  successNote: 'Trabzonspor tarih bilgisi yüksek',
  successScale: 'İleri Seviye',
}

export const adminQuizCategoryOptions = [
  { value: 'all', label: 'Kategori: Tümü (Tarih, Kadro, Efsaneler...)' },
  { value: 'tarih', label: 'Tarih & Kuruluş' },
  { value: 'sampiyonluklar', label: 'Şampiyonluklar' },
  { value: 'efsaneler', label: 'Efsaneler & Dozerler' },
  { value: 'kadro', label: 'Güncel Kadro' },
  { value: 'avrupa', label: 'Avrupa Kupaları' },
]

export const adminQuizListRows: AdminQuizListRow[] = [
  {
    id: '1',
    title: '2021-2022 Şampiyonluk Sezonu Hafıza Testi',
    category: 'Şampiyonluklar',
    categoryKey: 'sampiyonluklar',
    description:
      "Akyazı'daki tarihi gecelerden gol krallığına, unutulmaz şampiyonluk kadrosunu ne kadar hatırlıyorsun?",
    questionCount: 10,
    totalPoints: 100,
    participationLabel: '18.420 Katılım',
    participation: 18420,
    avgSuccessLabel: 'Ort. %78 Başarı',
    status: 'active',
    statusLabel: 'Aktif',
    icon: 'star',
  },
  {
    id: '2',
    title: 'Trabzonspor Efsaneleri: Dozer Cemil & Özkan Sümer Dönemi',
    category: 'Kulüp Tarihi',
    categoryKey: 'tarih',
    description:
      'Kulübün temellerini atan Karadeniz fırtınasının kurucu ruhu ve ilk şampiyonlukların anatomisi.',
    questionCount: 8,
    totalPoints: 80,
    participationLabel: '9.150 Katılım',
    participation: 9150,
    avgSuccessLabel: 'Ort. %64 Başarı',
    status: 'active',
    statusLabel: 'Aktif',
    icon: 'history_edu',
  },
  {
    id: '3',
    title: 'Avrupa Fatihleri: Inter, Aston Villa ve Barcelona Zaferleri',
    category: 'Avrupa Kupaları',
    categoryKey: 'avrupa',
    description:
      'Avrupa kupalarında tarihe geçen unutulmaz zaferler ve Hüseyin Avni Aker destanları.',
    questionCount: 12,
    totalPoints: 120,
    participationLabel: '11.340 Katılım',
    participation: 11340,
    avgSuccessLabel: 'Ort. %72 Başarı',
    status: 'active',
    statusLabel: 'Aktif',
    icon: 'public',
  },
  {
    id: '4',
    title: '2024-2025 Güncel Kadro ve Transfer Bilgisi',
    category: 'A Takım',
    categoryKey: 'kadro',
    description:
      'Yeni transferler, forma numaraları ve Şenol Güneş dönemi ilk 11 taktik kurgusu.',
    questionCount: 7,
    totalPoints: 70,
    participationLabel: '5.820 Katılım',
    participation: 5820,
    avgSuccessLabel: 'Ort. %81 Başarı',
    status: 'active',
    statusLabel: 'Aktif',
    icon: 'sports_soccer',
  },
  {
    id: '5',
    title: 'Unutulmaz Karadeniz Derbileri & Kupa Finalleri',
    category: 'Kupa Tarihi',
    categoryKey: 'tarih',
    description:
      'Türkiye Kupası ve Süper Kupa finallerinde atılan kritik goller ve dramatik anlar.',
    questionCount: 6,
    totalPoints: 60,
    participationLabel: '1.550 Katılım',
    participation: 1550,
    avgSuccessLabel: 'Ort. %58 Başarı',
    status: 'passive',
    statusLabel: 'Taslak / Pasif',
    icon: 'emoji_events',
  },
]

export const defaultAdminQuizCreateDraft: AdminQuizCreateDraft = {
  title: '2010-2011 Efsane Kadro ve Rekorlar Testi',
  description:
    '82 puanlı unutulmaz sezonun golcüleri, maç içi kırılma anları ve efsane kadronun sahadaki dizilişini test eden nostalji testi.',
  category: 'kadrolar',
  durationLabel: '5 Dakika',
  isLive: true,
  plannedQuestionCount: 10,
  plannedMaxScore: 100,
  badgeName: 'Karadeniz Hafızası',
  badgeRequirement: '%80+ Başarı Skoru Gerektirir',
  questions: [
    {
      id: 'q1',
      number: 1,
      text: "2010-2011 sezonunda Trabzonspor formasıyla Süper Lig'de gol krallığı yaşayan ve 28 gol atan santrafor kimdir?",
      points: 10,
      typeLabel: 'Tek Seçimli',
      expanded: true,
      options: [
        { id: 'q1a', label: 'A', text: 'Burak Yılmaz', isCorrect: true },
        { id: 'q1b', label: 'B', text: 'Umut Bulut', isCorrect: false },
        { id: 'q1c', label: 'C', text: 'Jajá Coelho', isCorrect: false },
        { id: 'q1d', label: 'D', text: 'Ibrahima Yattara', isCorrect: false },
      ],
    },
    {
      id: 'q2',
      number: 2,
      text: 'O sezon takımın başında bulunan ve fırtınayı lig tarihinin en yüksek puan rekorlarından birine ulaştıran teknik direktör kimdir?',
      points: 10,
      typeLabel: 'Tek Seçimli',
      expanded: true,
      options: [
        { id: 'q2a', label: 'A', text: 'Şenol Güneş', isCorrect: true },
        { id: 'q2b', label: 'B', text: 'Özkan Sümer', isCorrect: false },
        { id: 'q2c', label: 'C', text: 'Ahmet Suat Özyazıcı', isCorrect: false },
        { id: 'q2d', label: 'D', text: 'Hugo Broos', isCorrect: false },
      ],
    },
    {
      id: 'q3',
      number: 3,
      text: "Sezonun ikinci yarısında Avni Aker'de oynanan ve 3-0 kazanılan kritik Beşiktaş derbisinde...",
      points: 10,
      typeLabel: 'Tek Seçimli',
      expanded: false,
      options: [
        { id: 'q3a', label: 'A', text: 'Burak Yılmaz', isCorrect: true },
        { id: 'q3b', label: 'B', text: 'Colman', isCorrect: false },
        { id: 'q3c', label: 'C', text: 'Alanzinho', isCorrect: false },
        { id: 'q3d', label: 'D', text: 'Engin Baytar', isCorrect: false },
      ],
    },
  ],
}

export const defaultAdminQuizEditDraft: AdminQuizEditDraft = {
  id: '1',
  recordCode: '#QZ-2022-SAMPIYONLUK',
  title: '2021-2022 Şampiyonluk Sezonu Hafıza Testi',
  description:
    "Akyazı'daki tarihi gecelerden gol krallığına, unutulmaz şampiyonluk kadrosunu ne kadar hatırlıyorsun? 10 soruluk kapsamlı taraftar testi.",
  tags: [
    { id: 't1', label: 'Şampiyonluklar', tone: 'bg-primary-container text-on-primary' },
    { id: 't2', label: 'Kulüp Tarihi', tone: 'bg-secondary-container text-on-secondary-container' },
    { id: 't3', label: 'Akyazı Zaferleri', tone: 'bg-surface-container-high text-on-surface' },
  ],
  isLive: true,
  questionCount: 10,
  totalPoints: 100,
  questions: [
    {
      id: 'eq1',
      numberLabel: '01',
      text: 'Şampiyonluğun ilan edildiği Antalyaspor maçında ilk golü kim attı?',
      correctAnswer: 'Dorukhan Toköz',
      points: 10,
      isActive: true,
    },
    {
      id: 'eq2',
      numberLabel: '02',
      text: '2021-22 sezonunda ligde en çok asist yapan Trabzonsporlu futbolcu?',
      correctAnswer: 'Edin Višća',
      points: 10,
      isActive: true,
    },
    {
      id: 'eq3',
      numberLabel: '03',
      text: "Akyazı'da oynanan Galatasaray derbisinde son dakika galibiyet golünü kim kaydetti?",
      correctAnswer: 'Edin Višća',
      points: 10,
      isActive: true,
    },
    {
      id: 'eq4',
      numberLabel: '04',
      text: "Uğurcan Çakır'ın penaltı kurtardığı ve sezonun dönüm noktası olan deplasman maçı?",
      correctAnswer: 'Fenerbahçe Deplasmanı',
      points: 10,
      isActive: true,
    },
  ],
  hiddenQuestionCount: 6,
  retakeRule: 'daily',
  timeLimit: '30s',
  addToLeaderboard: true,
  previewCategory: 'Şampiyonluk Serisi',
  durationLabel: '5 Dakika',
  participationLabel: '18.420 Katılım',
  participation: 18420,
  participationTrend: '+14.2% bu hafta',
  completionRate: '%91.8',
  completionDetail: '16.910 başarılı son',
  averageScore: '78.4 / 100',
  averageNote: 'Taraftarların genel bilgi seviyesi yüksek oranda seyrediyor.',
  topAudience: 'Genç Fırtınalar Tribünü',
  topAudienceScore: 'Ortalama Skor: 89.2 Puan',
  lastEditor: 'Dozer Cemil',
  lastUpdated: 'Bugün, 14:20',
  publishedAt: '12.05.2024',
}

export function getAdminQuizEditDraft(quizId: string | undefined): AdminQuizEditDraft {
  if (!quizId || quizId === '1') {
    return defaultAdminQuizEditDraft
  }

  const row = adminQuizListRows.find((item) => item.id === quizId)

  if (!row) {
    return {
      ...defaultAdminQuizEditDraft,
      id: quizId,
      recordCode: `#QZ-${quizId}`,
    }
  }

  return {
    ...defaultAdminQuizEditDraft,
    id: row.id,
    recordCode: `#QZ-${row.id}-${row.categoryKey.toUpperCase()}`,
    title: row.title,
    description: row.description,
    isLive: row.status === 'active',
    questionCount: row.questionCount,
    totalPoints: row.totalPoints,
    participationLabel: row.participationLabel,
    participation: row.participation,
    previewCategory: row.category,
  }
}
