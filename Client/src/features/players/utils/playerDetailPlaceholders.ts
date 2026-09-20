export type CommentSort = 'liked' | 'newest' | 'analysis'

export type PlayerProfile = {
  name: string
  number: number
  position: string
  nationality: string
  dualNationality?: string
  loanLabel?: string
  statusBadge: string
  rating: number
  votes: string
  marketValue: string
  peakValue: string
  age: number
  birthDate: string
  height: string
  foot: string
  contractEnd: string
  contractNote: string
  squadStatus: string
  tone: string
}

export type RecentMatch = {
  opponent: string
  date: string
  score: string
  minutes: string
  goals: string
  assists: string
  rating: string
  win: boolean
}

export type Injury = {
  title: string
  detail: string
  duration: string
  recovered: string
  accent: boolean
  icon: string
}

export type Comparison = {
  label: string
  player: string
  league: string
  playerWidth: string
  leagueWidth: string
  bar: string
}

export type CareerClub = {
  club: string
  years: string
  record: string
}

export type RivalForward = {
  name: string
  line: string
  initials: string
}

export type PlaceholderComment = {
  id: string
  initials: string
  name: string
  badge: string
  badgeTone: 'mavi' | 'bordo'
  handle: string
  votes: number
  body: string
  replies: number
  reply?: {
    name: string
    handle: string
    votes: string
    body: string
  }
}

export const playerProfiles: Record<string, PlayerProfile> = {
  '1': {
    name: 'Uğurcan Çakır',
    number: 1,
    position: 'KALECİ / NO: 1',
    nationality: 'Türkiye',
    statusBadge: 'KAPTAN',
    rating: 9.4,
    votes: '18.420',
    marketValue: '8.50M €',
    peakValue: '12M €',
    age: 28,
    birthDate: '5 Nis 1996',
    height: '1.91 m',
    foot: 'Sağ Ayak',
    contractEnd: '30 Haz 2027',
    contractNote: 'Kulüp Sözleşmesi',
    squadStatus: 'Kadro Durumu: 11 Başlangıç Kalecisi',
    tone: 'from-[#5A0E27] to-[#1A040B]',
  },
  '2': {
    name: 'Simon Banza',
    number: 99,
    position: 'SANTRFOR / NO: 99',
    nationality: 'Demokratik Kongo Cumhuriyeti',
    dualNationality: 'Fransız Vatandaşlığı',
    loanLabel: 'Kiralık (SC Braga)',
    statusBadge: 'FORMDA GOL KRALI',
    rating: 9.1,
    votes: '14.280',
    marketValue: '16.00M €',
    peakValue: '18M €',
    age: 28,
    birthDate: '13 Ağu 1996',
    height: '1.89 m',
    foot: 'Sağ Ayak',
    contractEnd: '30 Haz 2025',
    contractNote: 'Kiralık Sözleşme',
    squadStatus: 'Kadro Durumu: 11 Başlangıç Forveti',
    tone: 'from-[#3f2900] to-[#1A040B]',
  },
  '3': {
    name: 'Edin Višća',
    number: 7,
    position: 'SAĞ KANAT / NO: 7',
    nationality: 'Bosna Hersek',
    statusBadge: 'ASİST LİDERİ',
    rating: 8.8,
    votes: '12.110',
    marketValue: '2.20M €',
    peakValue: '8M €',
    age: 34,
    birthDate: '17 Şub 1990',
    height: '1.72 m',
    foot: 'Sağ Ayak',
    contractEnd: '30 Haz 2026',
    contractNote: 'Kulüp Sözleşmesi',
    squadStatus: 'Kadro Durumu: 11 Başlangıç Sağ Kanat',
    tone: 'from-[#12648e] to-[#1A040B]',
  },
}

export const defaultProfile: PlayerProfile = playerProfiles['2']!

export const recentMatches: RecentMatch[] = [
  { opponent: 'vs Fenerbahçe (E)', date: '17 Şub 2025', score: '2 - 1 (G)', minutes: "90'", goals: '2', assists: '0', rating: '9.6', win: true },
  { opponent: '@ Samsunspor (D)', date: '09 Şub 2025', score: '1 - 1 (B)', minutes: "84'", goals: '1', assists: '0', rating: '8.2', win: false },
  { opponent: 'vs Antalyaspor (E)', date: '02 Şub 2025', score: '3 - 0 (G)', minutes: "78'", goals: '1', assists: '1', rating: '9.2', win: true },
  { opponent: '@ Beşiktaş (D)', date: '26 Oca 2025', score: '0 - 1 (M)', minutes: "90'", goals: '0', assists: '0', rating: '6.8', win: false },
  { opponent: 'vs Sivasspor (E)', date: '19 Oca 2025', score: '4 - 1 (G)', minutes: "88'", goals: '2', assists: '1', rating: '9.5', win: true },
]

export const injuries: Injury[] = [
  {
    title: 'Uyluk Gerilmesi (Hamstring Strain)',
    detail: 'Süper Lig 9. Hafta sonrasında antrenmanda hafif zorlanma.',
    duration: '12 Gün (2 Maç Kaçırdı)',
    recovered: 'Ekim 2024 - İyileşti',
    accent: true,
    icon: 'healing',
  },
  {
    title: 'Ayak Bileği Burkulması',
    detail: 'SC Braga döneminde maç içi darbe kaynaklı hafif esneme.',
    duration: '8 Gün (1 Maç Kaçırdı)',
    recovered: 'Ocak 2024 - İyileşti',
    accent: false,
    icon: 'personal_injury',
  },
  {
    title: 'Kas Yorgunluğu & Aşırı Yükleme',
    detail: 'Sezon başı kamp yüklemesi tedbir amaçlı dinlendirme.',
    duration: '5 Gün (0 Maç)',
    recovered: 'Ağustos 2023 - İyileşti',
    accent: false,
    icon: 'vital_signs',
  },
]

export const comparisons: Comparison[] = [
  { label: 'Hava Topu Hakimiyeti', player: '%68.5', league: '(Lig: %49.2)', playerWidth: '68.5%', leagueWidth: '49.2%', bar: 'bg-primary' },
  { label: 'Ceza Sahasında Topla Buluşma (90 dk)', player: '6.8 Kez', league: '(Lig: 4.1 Kez)', playerWidth: '68%', leagueWidth: '41%', bar: 'bg-secondary' },
  { label: 'Şut Başına Gol / Bitiricilik', player: '%28.5', league: '(Lig: %16.8)', playerWidth: '72%', leagueWidth: '33%', bar: 'bg-primary' },
  { label: 'Ön Alan Pres Gücü & Top Geri Kazanımı', player: '3.4 Pres / Maç', league: '(Lig: 2.1)', playerWidth: '78%', leagueWidth: '42%', bar: 'bg-secondary' },
]

export const careerClubs: CareerClub[] = [
  { club: 'SC Braga', years: '2022 — 2024', record: '41 Gol / 68 Maç' },
  { club: 'Famalicão', years: '2021 — 2022', record: '17 Gol / 33 Maç' },
  { club: 'RC Lens', years: '2019 — 2021', record: '8 Gol / 41 Maç' },
]

export const rivalForwards: RivalForward[] = [
  { name: 'Enis Destan', line: '4 Gol • 2 Asist', initials: 'ED' },
  { name: 'Denis Drăguș', line: '5 Gol • 1 Asist', initials: 'DD' },
]

export const placeholderComments: PlaceholderComment[] = [
  {
    id: 'c1',
    initials: 'AK',
    name: 'Akyazı Kapalı 61',
    badge: 'Kombine Sahibi',
    badgeTone: 'mavi' as const,
    handle: '@AkyaziKapali61 • 2 saat önce',
    votes: 248,
    body: "Fenerbahçe maçındaki ikinci golü tam bir usta santrfor vuruşuydu. Sörloth ve Cornelius'tan sonra ceza sahasında stoperleri bu kadar ezen, sırtı dönükken de takımı atağa kaldıran forvet izlememiştik. Braga'ya ne gerekiyorsa verilmeli, bu adamın bonservisi Trabzon'da kalmalı!",
    replies: 3,
    reply: {
      name: 'Fırtına Kuzey',
      handle: '@FirtinaKuzey • 45 dk önce',
      votes: '+34',
      body: 'Kesinlikle katılıyorum ağabey. Özellikle Višća ve Nwakaeme ile olan üçlü hücum senkronizasyonu her geçen hafta daha da kusursuzlaşıyor. Pres gücü zaten lig standartlarının çok üstünde.',
    },
  },
  {
    id: 'c2',
    initials: 'VT',
    name: 'Vira Tayfa',
    badge: 'Taktik Analisti',
    badgeTone: 'bordo' as const,
    handle: '@ViraTayfa • 4 saat önce',
    votes: 192,
    body: 'xG istatistiği 10.84 iken 12 gol üretmesi tesadüf değil. Ceza sahasında topla buluşma frekansı maç başına 6.8. Eğer orta sahadan Cham ve Mendy dikine beslemeye devam ederse sezonu 25+ golle tamamlayacaktır.',
    replies: 0,
  },
]
