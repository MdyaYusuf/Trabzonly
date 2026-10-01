export type CommentSort = 'liked' | 'newest' | 'analysis'

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
