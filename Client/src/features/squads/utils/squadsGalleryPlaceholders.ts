import type {
  FormationFilter,
  GallerySortTab,
  MatchFilter,
  SquadGalleryCardData,
} from './squadsGalleryTypes'

export const PAGE_SIZE = 6
export const TOTAL_SQUADS = 1428
export const TOTAL_PAGES = 12

export const sortTabs: { id: GallerySortTab; label: string; live?: boolean }[] = [
  { id: 'newest', label: 'Son Eklenenler' },
  { id: 'topRated', label: 'En Yüksek Puanlı' },
  { id: 'week11', label: "Haftanın 11'i" },
  { id: 'derby', label: 'Derbi Özel', live: true },
]

export const formationFilters: { id: FormationFilter; label: string }[] = [
  { id: 'all', label: 'Tüm Dizilişler' },
  { id: '4-2-3-1', label: '4-2-3-1' },
  { id: '4-3-3', label: '4-3-3' },
  { id: '3-5-2', label: '3-5-2' },
  { id: '3-4-1-2', label: '3-4-1-2' },
]

export const matchFilters: { id: MatchFilter; label: string }[] = [
  { id: 'all', label: 'Hedef Maç: Tüm Rakipler' },
  { id: 'bjk', label: 'Beşiktaş (Deplasman)' },
  { id: 'goz', label: 'Göztepe (İç Saha - Papara Park)' },
  { id: 'fb', label: 'Fenerbahçe (İç Saha - Papara Park)' },
  { id: 'gs', label: 'Galatasaray (Deplasman)' },
]

export const galleryStats = {
  totalSquads: '1.428',
  totalCaption: 'Tüm sezonlar arşivi',
  popularTitle: '4-2-3-1 Akyazı Presi',
  popularCaption: '%68 olumlu oy oranı',
  avgRating: '4.6',
  avgCaption: '/ 5.0',
  discussions: '182',
  discussionsCaption: 'Son 24 saat içinde yorum',
}

export const placeholderSquads: SquadGalleryCardData[] = [
  {
    id: '1',
    title: 'Akyazı Presi: Banza & Drăguș Çift Forvet Kuşatması',
    excerpt:
      "Geçiş oyununda Cham'ın serbest 10 numara rolüyle hücum kanatlarına açtığı koridorlar ve Banza'nın sırtı dönük top istasyonu oluşturduğu hızlı geçiş planı.",
    formation: '4-2-3-1',
    formationLabel: '4-2-3-1 (Asimetrik)',
    badge: 'Haftanın Trendi',
    badgeTone: 'trend',
    authorInitials: 'MR',
    authorUsername: '@MuratReis',
    authorBadge: 'Kıdemli Taktikçi',
    authorAvatarTone: 'primary',
    publishedLabel: '3 saat önce',
    rating: 4.8,
    ratingCount: 342,
    commentCount: 84,
    viewsLabel: '1.4k',
    pitchTags: ['HÜCUM: YÜKSEK BASKI', 'BLOK: ORTA SAHA İLERİSİ'],
    isWeekEleven: true,
    columns: [
      [{ number: '1', name: 'Çakır', tone: 'bordo' }],
      [
        { number: '79', name: 'Pedro', tone: 'mavi' },
        { number: '15', name: 'Savic', tone: 'bordo' },
        { number: '44', name: 'Batagov', tone: 'bordo' },
        { number: '18', name: 'Eren', tone: 'mavi' },
      ],
      [
        { number: '6', name: 'Mendy', tone: 'bordo' },
        { number: '5', name: 'Lundstram', tone: 'mavi' },
      ],
      [
        { number: '7', name: 'Višća', tone: 'mavi' },
        { number: '10', name: 'Cham', tone: 'mavi' },
        { number: '9', name: 'Nwakaeme', tone: 'mavi' },
      ],
      [{ number: '17', name: 'Banza', tone: 'bordo' }],
    ],
  },
  {
    id: '2',
    title: "Mendy'li Klasik Ekol: Sert 4-3-3 Karadeniz Dalgası",
    excerpt:
      "Nwakaeme ve Višća kanatlarının içeri kat etmesiyle oluşan ceza sahası yay genişliği; Mendy'nin süpürücü presiyle savunma hattını rahatlatıyor.",
    formation: '4-3-3',
    formationLabel: '4-3-3 Ofansif',
    badge: 'Hedef: Beşiktaş (D)',
    badgeTone: 'target',
    authorInitials: 'BF',
    authorUsername: '@BordoFirtina61',
    authorVerified: true,
    authorAvatarTone: 'secondary',
    publishedLabel: 'Dün 21:40',
    rating: 4.5,
    ratingCount: 188,
    commentCount: 52,
    viewsLabel: '920',
    pitchTags: ['ORTA SAHA DİRENCİ', 'KANAT İZOLASYONU'],
    columns: [
      [{ number: '1', name: 'Uğurcan', tone: 'bordo' }],
      [
        { number: '79', name: 'Pedro', tone: 'mavi' },
        { number: '24', name: 'Denswil', tone: 'bordo' },
        { number: '44', name: 'Batagov', tone: 'bordo' },
        { number: '3', name: 'Barišić', tone: 'mavi' },
      ],
      [
        { number: '6', name: 'Mendy', tone: 'bordo' },
        { number: '11', name: 'Ozan', tone: 'mavi' },
        { number: '10', name: 'Cham', tone: 'mavi' },
      ],
      [
        { number: '7', name: 'Višća', tone: 'mavi' },
        { number: '17', name: 'Banza', tone: 'bordo' },
        { number: '9', name: 'Nwakaeme', tone: 'mavi' },
      ],
    ],
  },
  {
    id: '3',
    title: '3-4-1-2 Hücum Varyasyonu: Kanat Bekli Hızlı Pres',
    excerpt:
      "Eren ve Pedro'nun hücum çizgisinde ileri çıkıp Cham'ın servisleriyle Drăguș-Banza ikilisine alan boşalttığı modern Karadeniz presi.",
    formation: '3-4-1-2',
    formationLabel: '3-4-1-2 Kanat Bekli',
    badge: '★ En Yüksek Puan',
    badgeTone: 'gold',
    authorInitials: 'AK',
    authorUsername: '@AkyazıKapalı61',
    authorAvatarTone: 'primary-container',
    publishedLabel: '2 gün önce',
    rating: 4.9,
    ratingCount: 419,
    commentCount: 116,
    viewsLabel: '2.1k',
    pitchTags: ['KANAT BEK BASKISI', 'HIZLI ŞOK PRES'],
    isWeekEleven: true,
    columns: [
      [{ number: '1', name: 'Uğurcan', tone: 'bordo' }],
      [
        { number: '15', name: 'Savic', tone: 'bordo' },
        { number: '24', name: 'Denswil', tone: 'bordo' },
        { number: '44', name: 'Batagov', tone: 'bordo' },
      ],
      [
        { number: '79', name: 'Pedro', tone: 'mavi' },
        { number: '6', name: 'Mendy', tone: 'bordo' },
        { number: '5', name: 'Lundstram', tone: 'mavi' },
        { number: '18', name: 'Eren', tone: 'mavi' },
      ],
      [{ number: '10', name: 'Cham', tone: 'mavi' }],
      [
        { number: '99', name: 'Drăguș', tone: 'mavi' },
        { number: '17', name: 'Banza', tone: 'bordo' },
      ],
    ],
  },
  {
    id: '4',
    title: "Gençlik & Altyapı Karması: Özkan Sümer 11'i",
    excerpt:
      'Kupa ve rotasyon haftalarında gençlerin fiziksel temposundan yararlanan, yerli oyuncu çekirdeğine dayalı yüksek mücadeleli kurgu.',
    formation: '4-2-3-1',
    formationLabel: '4-2-3-1 Akademi',
    badge: 'Altyapı Odaklı',
    badgeTone: 'classic',
    authorInitials: 'AS',
    authorUsername: '@AkademiScout61',
    authorAvatarTone: 'surface',
    publishedLabel: '3 gün önce',
    rating: 4.2,
    ratingCount: 94,
    commentCount: 38,
    viewsLabel: '640',
    pitchTags: ['DİNAMİK TEMPO', 'ALTYAPI ENTEGRASYONU'],
    columns: [
      [{ number: '1', name: 'Uğurcan', tone: 'bordo' }],
      [
        { number: '79', name: 'Pedro', tone: 'mavi' },
        { number: '15', name: 'Savic', tone: 'bordo' },
        { number: '44', name: 'Batagov', tone: 'bordo' },
        { number: '18', name: 'Eren', tone: 'mavi' },
      ],
      [
        { number: '6', name: 'Mendy', tone: 'bordo' },
        { number: '5', name: 'Lundstram', tone: 'mavi' },
      ],
      [
        { number: '7', name: 'Višća', tone: 'mavi' },
        { number: '10', name: 'Cham', tone: 'mavi' },
        { number: '9', name: 'Nwakaeme', tone: 'mavi' },
      ],
      [{ number: '99', name: 'Enis', tone: 'bordo' }],
    ],
  },
  {
    id: '5',
    title: 'Derbi Kurgusu: 4-4-2 Kompakt Blok ve Hızlı Kontra',
    excerpt:
      "Topu rakibe bırakıp merkezi kitleyen, Lundstram-Mendy tandemiyle kazanılan topları doğrudan Banza'nın göğüs indirmelerine ulaştıran plan.",
    formation: '4-4-2',
    formationLabel: '4-4-2 Düz Hat',
    badge: 'Derbi Stratejisi',
    badgeTone: 'derby',
    authorInitials: 'KK',
    authorUsername: '@KuzeyKaleArkasi',
    authorAvatarTone: 'primary',
    publishedLabel: '4 gün önce',
    rating: 4.7,
    ratingCount: 267,
    commentCount: 73,
    viewsLabel: '1.8k',
    pitchTags: ['KOMPAKT ALAN DARALTMA', 'HIZLI KANAT KONTRA'],
    isDerby: true,
    columns: [
      [{ number: '1', name: 'Uğurcan', tone: 'bordo' }],
      [
        { number: '79', name: 'Pedro', tone: 'mavi' },
        { number: '15', name: 'Savic', tone: 'bordo' },
        { number: '24', name: 'Denswil', tone: 'bordo' },
        { number: '3', name: 'Barišić', tone: 'mavi' },
      ],
      [
        { number: '7', name: 'Višća', tone: 'mavi' },
        { number: '6', name: 'Mendy', tone: 'bordo' },
        { number: '5', name: 'Lundstram', tone: 'mavi' },
        { number: '9', name: 'Nwakaeme', tone: 'mavi' },
      ],
      [
        { number: '99', name: 'Drăguș', tone: 'mavi' },
        { number: '17', name: 'Banza', tone: 'bordo' },
      ],
    ],
  },
  {
    id: '6',
    title: 'Akan Oyunda Total Futbol: 3-5-2 Geniş Saha Yerleşimi',
    excerpt:
      "Trabzonspor'un 1970'lerdeki meşhur saha parselasyonunun modern yorumu: Savunma üçlüsünden oyun kurma ve 5 orta saha ile alan daraltma.",
    formation: '3-5-2',
    formationLabel: '3-5-2 Total Futbol',
    badge: 'Papara Park Klasiği',
    badgeTone: 'classic',
    authorInitials: 'SK',
    authorUsername: '@DrSelimKaya',
    authorBadge: 'Tarihçi Yazar',
    authorAvatarTone: 'secondary',
    publishedLabel: '5 gün önce',
    rating: 4.6,
    ratingCount: 155,
    commentCount: 49,
    viewsLabel: '1.1k',
    pitchTags: ['GENİŞ SAHA HAKİMİYETİ', 'ÇİFT KULE BASKISI'],
    columns: [
      [{ number: '1', name: 'Uğurcan', tone: 'bordo' }],
      [
        { number: '15', name: 'Savic', tone: 'bordo' },
        { number: '24', name: 'Denswil', tone: 'bordo' },
        { number: '44', name: 'Batagov', tone: 'bordo' },
      ],
      [
        { number: '79', name: 'Pedro', tone: 'mavi' },
        { number: '6', name: 'Mendy', tone: 'bordo' },
        { number: '10', name: 'Cham', tone: 'mavi' },
        { number: '5', name: 'Lundstram', tone: 'mavi' },
        { number: '18', name: 'Eren', tone: 'mavi' },
      ],
      [
        { number: '99', name: 'Drăguș', tone: 'mavi' },
        { number: '17', name: 'Banza', tone: 'bordo' },
      ],
    ],
  },
]
