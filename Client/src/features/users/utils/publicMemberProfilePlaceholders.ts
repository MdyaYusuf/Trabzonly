import type { PublicMemberProfile } from './publicMemberProfileTypes'

export const defaultPublicMemberProfile: PublicMemberProfile = {
  username: 'bordofirtina61',
  displayName: 'Kuzey Kaplanı • Ahmet Reis',
  handle: '@bordofirtina61',
  initials: 'BF',
  coverMotto: 'BİZE HER YER TRABZON',
  stadiumLabel: 'Papara Park • Doğu Üst Tribünü',
  spiritLabel: '1967 RUHU AKTİF',
  roleBadge: 'Onaylı Tribün Yazarı',
  levelBadge: 'Kıdemli Taraftar • Seviye 5',
  seatLabel: 'Kombine Sahibi (Doğu Üst • Blok 314)',
  location: 'Trabzon / Ortahisar',
  joinedLabel: 'Katılım: Eylül 2021',
  bio: "1967'den bu yana Avni Aker ve Akyazı sevdalısı. Taktik analizler, tribün hikayeleri ve bordo-mavi sevdanın peşinde bir Karadeniz çocuğu.",
  motto: '“Dik Oyna, Dik Dur!”',
  liveSessionLabel: 'Canlı Tribün Oturumu: Açık',
  stats: [
    { id: 'points', label: 'Tribün Puanı', value: '4.850', unit: 'TP' },
    { id: 'posts', label: 'Toplam Gönderi', value: '48', unit: 'Yazı' },
    { id: 'squads', label: 'Taktik Kadrolar', value: '14', unit: 'Diziliş' },
    { id: 'network', label: 'Topluluk Ağı', value: '1.840', unit: 'Takipçi / 312 Takip' },
  ],
  badgePreviewIcons: ['trophy', 'shield', 'strategy', 'local_fire_department'],
  badgeExtraCount: 8,
  tabs: [
    { id: 'posts', label: 'Gönderiler', icon: 'article', count: 48 },
    { id: 'squads', label: 'Kadrolar & Taktikler', icon: 'sports', count: 14 },
    { id: 'quizzes', label: 'Quiz Başarıları', icon: 'quiz', count: 19 },
    { id: 'comments', label: 'Yorumlar', icon: 'forum', count: 342 },
  ],
  posts: [
    {
      id: '1',
      categoryLabel: 'Taktik & Analiz',
      categoryTone: 'primary',
      readTime: '6 dk okuma',
      publishedLabel: '2 gün önce',
      title: "Akyazı'da Çift Forvet Presi: Banza ve Drăguș İkilisi Nasıl Çalışmalı?",
      excerpt:
        "Avrupa dönüşü ligdeki tempo kaybını önlemenin yegane yolu ön alan presinde ikinci forvetin savunma stoperlerini çizgiye çekmesinden geçiyor. Mendy'nin süpürücü rolü sayesinde merkezi boşaltmadan kanat koridorlarını nasıl tıkadığımızın detaylı tahta çözümü...",
      likeCount: 128,
      commentCount: 34,
      saveCount: 18,
      imageTone: 'from-primary via-primary-container to-secondary',
    },
    {
      id: '2',
      categoryLabel: 'Tribün Hikayeleri',
      categoryTone: 'tertiary',
      readTime: '4 dk okuma',
      publishedLabel: '1 hafta önce',
      title: "1996'dan Bugüne Dinmeyen Sevda: Hüseyin Avni Aker Hatıraları",
      excerpt:
        'O yağmurlu kasım gecesi deniz tarafından esen rüzgar sadece formamızı değil, ruhumuzu da sırılsıklam etmişti. Kale arkasındaki tahta sıralarda babamın montunun altına sığındığım o 90 dakika, hayatım boyunca nereye ait olduğumu fısıldadı bana.',
      likeCount: 245,
      commentCount: 82,
      saveCount: 41,
      imageTone: 'from-secondary via-[#0b3a55] to-primary',
    },
  ],
  squads: [
    {
      id: '1',
      formation: '4-2-3-1',
      rating: '4.9',
      votesLabel: '(142 oy)',
      title: 'Akyazı Şok Baskısı',
      keyPlayers: 'Uğurcan • Savić • Mendy • Cham • Banza',
      boardLabel: 'Taktik Tahtası v2.4',
      tacticLabel: 'Ön Alan Presi & Hızlı Kanatlar',
      pitchTone: 'from-[#0d3b1f] via-[#14532d] to-[#052e16]',
    },
    {
      id: '2',
      formation: '3-5-2',
      rating: '4.7',
      votesLabel: '(89 oy)',
      title: 'Total Karadeniz Akını',
      keyPlayers: 'Uğurcan • Denswil • Savić • Visca • Drăguș',
      boardLabel: 'Taktik Tahtası v1.9',
      tacticLabel: 'Hızlı Geçiş & Kanat Baskısı',
      pitchTone: 'from-[#14532d] via-[#166534] to-primary',
    },
  ],
  featuredBadges: [
    {
      id: '1',
      icon: 'history_edu',
      title: 'Efsane Tribün Hafızası',
      description: '%93 Quiz başarı yüzdesi ile kazanıldı',
    },
    {
      id: '2',
      icon: 'analytics',
      title: 'Usta Analist',
      description: '10+ gönderisi editör seçkisine girdi',
    },
    {
      id: '3',
      icon: 'stadium',
      title: 'Avni Aker Emektarı',
      description: 'Tarihi arşiv katkıları tescillendi',
    },
  ],
  quizAveragePercent: 88,
  legends: [
    {
      id: '1',
      name: 'Şenol Güneş',
      title: 'Efsane Kaptan',
      tone: 'from-primary to-primary-container',
      initials: 'ŞG',
    },
    {
      id: '2',
      name: 'Dozer Cemil',
      title: 'Ruhun Timsali',
      tone: 'from-secondary to-[#0b3a55]',
      initials: 'DC',
    },
    {
      id: '3',
      name: 'Hami Mandıralı',
      title: 'Füze Ustası',
      tone: 'from-tertiary-container to-primary',
      initials: 'HM',
    },
    {
      id: '4',
      name: 'A. Nwakaeme',
      title: 'Sihirbaz',
      tone: 'from-primary-container to-secondary',
      initials: 'AN',
    },
  ],
  unforgettableMatch: {
    dateLabel: '30 Nisan 2022 • Antalyaspor',
    title: 'Şampiyonluk Gecesi',
    scoreLabel: '2-2',
  },
  tribuneCharm:
    '“1995 model bordo-mavi kasket ve 61. dakikada ayağa kalkış ritüeli.”',
  activities: [
    {
      id: '1',
      kind: 'comment',
      title: 'Simon Banza Oyuncu Analizi',
      detail:
        'yazısına yorum yaptı: "Özellikle pivot santrafor özelliklerinin arkasındaki Cham\'ı rahatlattığı aşikar..."',
      timeLabel: 'Dün akşam • 21:44',
    },
    {
      id: '2',
      kind: 'quiz',
      title: '2021-22 Şampiyonluk Testi',
      detail: "'ni tamamladı. Skor: 14 / 15 (%93 Başarı)",
      timeLabel: '3 gün önce',
    },
    {
      id: '3',
      kind: 'squad',
      title: 'Yeni bir taktik paylaştı:',
      detail: '“Akyazı Şok Baskısı”',
      timeLabel: '5 gün önce',
    },
  ],
}

const profilesByUsername: Record<string, PublicMemberProfile> = {
  bordofirtina61: defaultPublicMemberProfile,
  Bordofirtina61: defaultPublicMemberProfile,
  BordoFırtına61: defaultPublicMemberProfile,
}

export function getPublicMemberProfile(username: string | undefined): PublicMemberProfile {
  if (!username) {
    return defaultPublicMemberProfile
  }

  const normalized = username.replace(/^@/, '').toLowerCase()
  const match = Object.entries(profilesByUsername).find(
    ([key]) => key.toLowerCase() === normalized,
  )

  if (match) {
    return match[1]
  }

  return {
    ...defaultPublicMemberProfile,
    username: normalized,
    handle: `@${normalized}`,
    displayName: username,
  }
}
