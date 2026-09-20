import type { MySquadCardData, MySquadFilter, MySquadSort } from './mySquadsTypes'

export const mySquadsStats = {
  total: '4',
  totalCaption: 'Diziliş Kayıtlı',
  avgRating: '4.7',
  avgCaption: '/ 5.0 (Topluluk)',
  views: '18.4B',
  viewsCaption: 'Etkileşim',
  comments: '284',
  commentsCaption: 'Tribün Katkısı',
}

export const mySquadFilterTabs: { id: MySquadFilter; label: string }[] = [
  { id: 'all', label: 'Tümü' },
  { id: 'published', label: 'Yayında / Herkese Açık' },
  { id: 'draft', label: 'Taslaklar' },
  { id: 'popular', label: 'En Çok Beğenilenler' },
]

export const mySquadSortOptions: { id: MySquadSort; label: string }[] = [
  { id: 'newest', label: 'En Yeniler' },
  { id: 'rating', label: 'En Yüksek Puanlılar' },
  { id: 'comments', label: 'En Çok Yorumlananlar' },
]

export const placeholderMySquads: MySquadCardData[] = [
  {
    id: '1',
    title: 'Akyazı Şok Presi: Karadeniz Fırtınası',
    excerpt:
      "İç sahada topun rakibe bırakılmadığı, Mendy-Okay ikilisinin orta alanı süpürdüğü ve Cham'ın serbest 10 numara rolünde Banza'yı beslediği yüksek tempolu 4-2-3-1 kurgusu.",
    status: 'published',
    isPopular: true,
    variant: 'featured',
    formationLabel: '4-2-3-1 OFANSİF',
    updatedLabel: 'GÜNCELLENDİ: DÜN 21:44',
    tags: ['# Yüksek Şok Pres', '# Ofsayt Tuzağı', '# Kanat Bek Bindirmesi', '# Hızlı Ters Top'],
    rating: 4.9,
    ratingCount: 142,
    viewsLabel: '8.6B',
    commentCount: 138,
    shareCount: 42,
    pitchFooter: ['HÜCUM GENİŞLİĞİ: %72', 'SAVUNMA HATTI: 48M'],
    keyRoles: [
      { name: 'Uğurcan Çakır', role: 'Libero Kaleci' },
      { name: 'Stefan Savić', role: 'Pasör Stoper' },
      { name: 'Batista Mendy', role: 'Dinamik Ön Libero' },
      { name: 'Muhammed Cham', role: 'Oyun Kurucu' },
      { name: 'Simon Banza', role: 'Pres Forveti' },
    ],
    pitchRows: [
      [{ number: '17', name: 'Banza', tone: 'accent' }],
      [
        { number: '7', name: 'Višća', tone: 'light' },
        { number: '10', name: 'Cham', tone: 'light' },
        { number: '9', name: 'Nwakaeme', tone: 'light' },
      ],
      [
        { number: '6', name: 'Mendy', tone: 'light' },
        { number: '8', name: 'Okay', tone: 'light' },
      ],
      [
        { number: '77', name: 'Eren', tone: 'surface' },
        { number: '15', name: 'Savić', tone: 'surface' },
        { number: '44', name: 'Batagov', tone: 'surface' },
        { number: '79', name: 'Malheiro', tone: 'surface' },
      ],
      [{ number: '1', name: 'Uğurcan (K)', tone: 'gold' }],
    ],
  },
  {
    id: '2',
    title: '3-5-2 Total Karadeniz Akını',
    excerpt:
      "Kanat forvetlerin çizgiye basarak derinlik kazandırdığı, Banza ve Drăguș'un savunma arkası koşularıyla stoperleri yıprattığı, üçlü merkez stoper kurgusu.",
    status: 'published',
    isPopular: true,
    variant: 'compact',
    formationLabel: 'FORMASYON: 3-5-2 ÇİFT FORVET',
    updatedLabel: '3 GÜN ÖNCE OLUŞTURULDU',
    tags: ['# Merkez Baskısı', '# Geniş Kanatlar', '# Hızlı Geçiş Hücumu'],
    rating: 4.6,
    ratingCount: 89,
    viewsLabel: '5.1B',
    commentCount: 74,
    shareCount: 19,
    lineupPreview:
      'Uğurcan, Savić, Batagov, Denswil, Malheiro, Mendy, Okay, Cham, Eren Elmalı, Drăguș, Banza',
    pitchRows: [
      [
        { number: '', name: '', tone: 'accent' },
        { number: '', name: '', tone: 'accent' },
      ],
      [
        { number: '', name: '', tone: 'light' },
        { number: '', name: '', tone: 'light' },
        { number: '', name: '', tone: 'light' },
        { number: '', name: '', tone: 'light' },
        { number: '', name: '', tone: 'light' },
      ],
      [
        { number: '', name: '', tone: 'surface' },
        { number: '', name: '', tone: 'surface' },
        { number: '', name: '', tone: 'surface' },
      ],
    ],
  },
  {
    id: '3',
    title: '4-4-2 Klasik Akyazı Kuşatması',
    excerpt:
      'İki kule santrfor ile ceza sahası dominasyonu, kanatlardan yoğun isabetli orta stratejisi ve duran toplarda Savić - Denswil hava hakimiyeti.',
    status: 'published',
    isPopular: false,
    variant: 'compact',
    formationLabel: 'FORMASYON: 4-4-2 DÜZ HAT',
    updatedLabel: '1 HAFTA ÖNCE OLUŞTURULDU',
    tags: ['# Kompakt Savunma', '# Hedef Santrfor Destekli', '# Duran Top Tehdidi'],
    rating: 4.5,
    ratingCount: 64,
    viewsLabel: '3.8B',
    commentCount: 51,
    shareCount: 12,
    lineupPreview:
      'Uğurcan, Pedro Malheiro, Stefan Savić, Stefano Denswil, Eren Elmalı, Edin Višća, Batista Mendy, Ozan Tufan, Anthony Nwakaeme, Simon Banza, Denis Drăguș',
    strategyStats: [
      { label: 'Hücum Hızı:', value: '%84 Hızlı' },
      { label: 'Pas Stili:', value: 'Direkt Uzun' },
    ],
  },
  {
    id: '4',
    title: '4-3-3 Derbi Özel: Kontra Fırtına',
    excerpt:
      'Büyük maçlar için deplasman kurgusu. Rakip yarı alana hızlı çıkışlar, orta alanda 3 savaşçı ve kanatların ters koşuları. Kadro tamamlandıktan sonra topluluk oylamasına açılacaktır.',
    status: 'draft',
    isPopular: false,
    variant: 'draft',
    formationLabel: 'FORMASYON: 4-3-3 TUTUCU ORTA SAHA',
    updatedLabel: '',
    tags: ['# Alçak Blok', '# Direkt Hücum', '# Geçiş Savunması'],
    draftProgress: 81,
    draftMissing: 'Sol Stoper, Santrfor',
    draftPlayerCount: '9 / 11 OYUNCU SEÇİLDİ',
  },
]

export const leagueCta = {
  leaderScore: '4.92',
  leaderSquad: 'Kadro: "4-3-3 Pres Baskını"',
}
