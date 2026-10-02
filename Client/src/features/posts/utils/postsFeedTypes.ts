export type FeedSortOption = 'newest' | 'popular' | 'discussed'

export type CategoryBadgeTone = 'primary' | 'primary-container' | 'secondary'

export type FeedPostCard = {
  id: string
  categoryId: number
  categoryLabel: string
  categoryTone: CategoryBadgeTone
  publishedLabel: string
  readTimeLabel?: string | null
  title: string
  excerpt: string
  content: string
  authorInitials: string
  authorUsername: string
  authorDisplayTag?: string | null
  likeCount: number
  dislikeCount: number
  commentCount: number
  imageUrl?: string
}

export const PAGE_SIZE = 10

export const sortOptions: { value: FeedSortOption; label: string }[] = [
  { value: 'newest', label: 'En Yeniler' },
  { value: 'popular', label: 'En Popülerler' },
  { value: 'discussed', label: 'En Çok Tartışılanlar' },
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
