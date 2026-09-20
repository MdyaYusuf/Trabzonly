export const tribuneOptions = [
  'Doğu Üst Tribünü (Papara Park)',
  'Batı Alt VIP Tribünü',
  'Kuzey Kale Arkası (Fırtına Grubu)',
  'Güney Kale Arkası',
  'Gurbetçi / Dijital Tribün',
] as const

export const defaultProfileSettings = {
  initials: 'BF',
  displayName: 'BordoFırtına61',
  handle: 'bordofirtina61',
  roleBadge: 'Doğrulanmış Bordo-Mavi Yazar',
  subtitle: 'Kıdemli Taktik Analisti • Trabzonspor Kongre Üyesi • Doğu Üst Blok Tribün Sakini',
  memberSince: 'Üyelik: Ağustos 2022',
  kongreBadge: '61 Kongre',
  stats: {
    posts: 24,
    squads: 14,
    communityScore: '98%',
  },
  bio: 'Akyazı Papara Park Doğu Üst tribününden taktik gözlemler. 4-2-3-1 pres geometrisi, altyapı scout analizleri ve Karadeniz fırtınasının saha içi aklı. Trabzonspor sevdasıyla.',
  tribune: 'Doğu Üst Tribünü (Papara Park)' as (typeof tribuneOptions)[number],
  city: 'Trabzon / Ortahisar',
  xHandle: 'bordofirtina61',
  newsletterUrl: 'bordoanaliz.substack.com',
}

export const recentAuthorPosts = [
  {
    id: '1',
    category: 'Taktik & Analiz',
    status: 'published' as const,
    title: "Akyazı'da Çift Forvet Presi: Banza ve Drăguș Birlikte Nasıl Oynamalı?",
    meta: '3 saat önce',
    likes: 342,
    comments: 88,
  },
  {
    id: '2',
    category: 'Kadro Analizi',
    status: 'published' as const,
    title: "Mendy'nin 6 Numara Yalnızlığı: İkinci Bir Dinamo Şart mı?",
    meta: '14 Şub 2025',
    likes: 218,
    comments: 42,
  },
  {
    id: '3',
    category: 'Tarih & Taktik',
    status: 'draft' as const,
    title: "Avni Aker'den Kalan Dersler: Trabzonspor Baskıdan Nasıl Çıkmalı?",
    meta: 'Son güncelleme dün 23:40',
  },
]

export const myTacticalSquads = [
  {
    id: 's1',
    title: '4-2-3-1 Akyazı Pres Şablonu #1',
    badge: '4-2-3-1',
    featured: true,
    body: 'Çakır; Malheiro, Batagov, Denswil, Elmalı; Mendy, Lundstram; Višća, Cham, Nwakaeme; Banza',
    views: 1420,
    likes: 84,
  },
  {
    id: 's2',
    title: '3-4-1-2 Hücum Varyasyonu',
    badge: 'Derbi Özel',
    featured: false,
    body: 'Diziliş: 3-4-1-2 • Drăguș & Banza Çift Forvet • Cham 10 Numara Serbest Dinamik',
    views: 620,
    likes: 31,
  },
]

export const defaultNotificationPrefs = {
  commentNotifications: true,
  preMatchPoll: true,
  weeklyNewsletter: false,
}
