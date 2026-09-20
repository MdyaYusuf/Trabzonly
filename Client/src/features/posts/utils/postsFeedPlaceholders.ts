import type { FeedPostCard, FeedSortOption, PostCategoryId } from './postsFeedTypes'

export const PAGE_SIZE = 5

export const categoryTabs: { id: PostCategoryId; label: string; count: number }[] = [
  { id: 'all', label: 'Tümü', count: 1420 },
  { id: 'taktik', label: 'Taktik & Analiz', count: 384 },
  { id: 'mac', label: 'Maç Değerlendirmesi', count: 412 },
  { id: 'transfer', label: 'Transfer & Kadro', count: 290 },
  { id: 'tribun', label: 'Tribün & Deplasman', count: 185 },
  { id: 'tarihce', label: 'Tarihçe & Efsaneler', count: 96 },
  { id: 'kulup', label: 'Kulüp Gündemi', count: 53 },
]

export const sortOptions: { value: FeedSortOption; label: string }[] = [
  { value: 'newest', label: 'En Yeniler' },
  { value: 'popular', label: 'En Popülerler' },
  { value: 'discussed', label: 'En Çok Tartışılanlar' },
  { value: 'tactical', label: 'Taktik Analizler' },
]

export const placeholderPosts: FeedPostCard[] = [
  {
    id: '1',
    categoryId: 'taktik',
    categoryLabel: 'Taktik & Analiz',
    categoryTone: 'primary-container',
    badge: '★ Editörün Seçimi',
    badgeTone: 'secondary',
    publishedLabel: '3 saat önce',
    readTimeLabel: 'Okuma Süresi: 4 dk',
    title: "Akyazı'da Çift Forvet Presi: Banza ve Drăguș Birlikte Nasıl Oynamalı?",
    excerpt:
      "Göztepe maçının ikinci yarısında izlediğimiz 4-4-2 geçişi, rakip stoperlerin oyun kurmasını kilitledi. Ancak Cham'ın merkezdeki pas açılarının kapanmaması için Cham-Mendy ikilisinin mesafesini koruması şart...",
    authorInitials: 'MR',
    authorUsername: '@MuratReis',
    authorRole: 'Kıdemli Yazar • 61 Gönderi',
    authorAvatarTone: 'primary-container',
    verified: true,
    likeCount: 342,
    dislikeCount: 12,
    commentCount: 88,
    featured: true,
    imageUrl: '/assets/posts/post-feed-featured.png',
    imageOverlayLabel: 'Taktik Tahtası • Rapor #61',
    showBookmark: true,
  },
  {
    id: '2',
    categoryId: 'tarihce',
    categoryLabel: 'Tarihçe & Efsaneler',
    categoryTone: 'secondary',
    badge: 'Avni Aker Arşivi',
    badgeTone: 'tertiary',
    publishedLabel: '6 saat önce',
    readTimeLabel: 'Okuma Süresi: 7 dk',
    title: "Avni Aker'in Çamurlu Çimlerinden Bugüne: 1976 Ruhunu Neden Unutmamalıyız?",
    excerpt:
      "Ahmet Suat Özyazıcı'nın yarattığı pres futbolu sadece taktik bir diziliş değil, Karadeniz insanının hırçın dalgalara karşı koyma refleksidir. İstanbul hegemonyasını yıkan o ilk şampiyonluk kadrosundaki disiplin, bugün Akyazı'da aradığımız temel kimliktir.",
    authorInitials: 'SK',
    authorUsername: '@DrSelimKaya',
    authorRole: 'Tarihçi Yazar • Trabzon Arşivi',
    authorAvatarTone: 'secondary',
    likeCount: 519,
    dislikeCount: 4,
    commentCount: 142,
    showBookmark: true,
    showSaveLabel: true,
  },
  {
    id: '3',
    categoryId: 'mac',
    categoryLabel: 'Maç Değerlendirmesi',
    categoryTone: 'primary-container',
    publishedLabel: '8 saat önce',
    title:
      'Hafta Sonu Derbisi Öncesi Kadro Alarmı: Savunma Hattı Batagov ve Denswil İkilisine Emanet Edilmeli mi?',
    excerpt:
      "Son antrenman raporlarına göre stoper tandemi için iki alternatif var. Batagov'un ayağının temiz olması geriden oyun kurma hızımızı artıracaktır. Ancak rakibin hızlı forvetlerine karşı Denswil'in tecrübesi şart. Savunma çizgisini ne kadar önde kuracağız?",
    authorInitials: 'VF',
    authorUsername: '@ViraFirtina',
    authorRole: 'Tribün Lideri • Doğu Alt',
    authorAvatarTone: 'primary',
    likeCount: 278,
    dislikeCount: 31,
    commentCount: 95,
    pollSnippet: {
      label: 'Taraftar Görüşü Anketi:',
      result: '%64 Batagov Başlasın',
      votesLabel: '841 Oy',
    },
  },
  {
    id: '4',
    categoryId: 'transfer',
    categoryLabel: 'Transfer & Kadro',
    categoryTone: 'secondary',
    publishedLabel: '12 saat önce',
    readTimeLabel: 'Finansal Dosya',
    title: "Simon Banza'nın Satın Alma Opsiyonu: Yönetim Bütçeyi Zorlamalı mı?",
    excerpt:
      "12 golle krallıkta zirveye koşan Kongolu forvet için Braga ile masaya oturulacak. Taraftar anketinde %88 'Alınmalı' sonucu çıktı. Sözleşme maddelerinde yer alan opsiyon bedeli ve Avrupa Konferans Ligi gelirleri karşılaştırıldığında bu yatırım kulübe değer kazandırır mı?",
    authorInitials: 'BA',
    authorUsername: '@BordoMaviAnaliz',
    authorRole: 'Taktikçi • Scout Masası',
    authorAvatarTone: 'primary-container',
    likeCount: 412,
    dislikeCount: 18,
    commentCount: 164,
    showBookmark: true,
  },
  {
    id: '5',
    categoryId: 'tribun',
    categoryLabel: 'Tribün & Deplasman',
    categoryTone: 'primary',
    publishedLabel: '1 gün önce',
    readTimeLabel: 'Resmi Duyuru',
    title: 'İstanbul Deplasmanı Organizasyonu ve Bilet Bilgilendirmesi',
    excerpt:
      "Otobüs kalkış noktaları Meydan ve Değirmendere olarak belirlenmiştir. Bordo-Mavi forması olmayan taraftarlarımız kafileye dahil edilmeyecektir. Bilet transferleri Passolig sistemi üzerinden Cuma günü saat 13:00'te başlayacaktır.",
    authorInitials: 'TS',
    authorUsername: '@TrabzonluGenclik',
    authorRole: 'Deplasman Kolu • Koordinasyon',
    authorAvatarTone: 'secondary',
    likeCount: 620,
    dislikeCount: 0,
    commentCount: 73,
  },
]

export const weeklyAuthors = [
  {
    rank: 1,
    initials: 'MR',
    username: '@MuratReis',
    readsLabel: '14.2k Okunma',
    avatarTone: 'primary-container' as const,
  },
  {
    rank: 2,
    initials: 'SK',
    username: '@DrSelimKaya',
    readsLabel: '11.8k Okunma',
    avatarTone: 'secondary' as const,
  },
  {
    rank: 3,
    initials: 'BA',
    username: '@BordoMaviAnaliz',
    readsLabel: '9.4k Okunma',
    avatarTone: 'primary' as const,
  },
]

export const forumPrinciples = [
  {
    title: 'Küfürsüz Bordo-Mavi Sevda',
    body: 'Hakaret, argo ve küfür içeren yorumlar sistem tarafından anında filtrelenir.',
  },
  {
    title: 'Taktik ve Yapıcı Eleştiri Kültürü',
    body: 'Skordan bağımsız veri ve saha içi analizi desteklenir.',
  },
  {
    title: 'Bağımsız Taraftar Duruşu',
    body: 'Kulübün menfaatleri her türlü kişisel veya zümre çıkarının üzerindedir.',
  },
]
