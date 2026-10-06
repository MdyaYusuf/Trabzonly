export const PAGE_SIZE = 6

export type GallerySortTab = 'newest' | 'topRated'
export type GalleryViewMode = 'grid' | 'list'

export type PitchPlayerTone = 'bordo' | 'mavi'

export type PitchPlayer = {
  number: string
  name: string
  tone: PitchPlayerTone
}

export type SquadGalleryCardData = {
  id: string
  title: string
  excerpt: string
  formation: string
  formationLabel: string
  authorUsername: string
  authorDisplayTag?: string | null
  publishedLabel: string
  rating: number
  ratingCount: number
  commentCount: number
  viewCount: number
  columns: PitchPlayer[][]
}

export const sortTabs: { id: GallerySortTab; label: string }[] = [
  { id: 'newest', label: 'Son Eklenenler' },
  { id: 'topRated', label: 'En Yüksek Puanlı' },
]
