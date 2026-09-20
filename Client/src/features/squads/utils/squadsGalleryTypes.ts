export type GallerySortTab = 'newest' | 'topRated' | 'week11' | 'derby'
export type FormationFilter = 'all' | '4-2-3-1' | '4-3-3' | '3-5-2' | '3-4-1-2' | '4-4-2'
export type GalleryViewMode = 'grid' | 'list'
export type MatchFilter = 'all' | 'bjk' | 'goz' | 'fb' | 'gs'

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
  formation: FormationFilter
  formationLabel: string
  badge?: string
  badgeTone?: 'trend' | 'gold' | 'target' | 'derby' | 'classic'
  authorInitials: string
  authorUsername: string
  authorBadge?: string
  authorVerified?: boolean
  authorAvatarTone: 'primary' | 'secondary' | 'primary-container' | 'surface'
  publishedLabel: string
  rating: number
  ratingCount: number
  commentCount: number
  viewsLabel: string
  pitchTags: [string, string]
  columns: PitchPlayer[][]
  isDerby?: boolean
  isWeekEleven?: boolean
}
