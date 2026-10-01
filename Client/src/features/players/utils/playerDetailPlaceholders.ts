export type CommentSort = 'liked' | 'newest' | 'analysis'

export type Injury = {
  title: string
  detail: string
  duration: string
  recovered: string
  accent: boolean
  icon: string
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
