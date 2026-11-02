import type { FormationRowSpread } from './squadBuilderTypes'

export const PAGE_SIZE = 6

export type GallerySortTab = 'newest' | 'topRated'

export type PitchPlayer = {
  number: string
  name: string
  slotId?: string
  isGk?: boolean
  avatarGradient: string
}

export type PitchColumn = {
  players: PitchPlayer[]
  spread?: FormationRowSpread
}

export type SquadGalleryCardData = {
  id: string
  title: string
  excerpt: string
  formation: string
  formationLabel: string
  authorUsername: string
  authorDisplayTag?: string | null
  authorProfileImageUrl?: string | null
  publishedLabel: string
  rating: number
  ratingCount: number
  commentCount: number
  viewCount: number
  columns: PitchColumn[]
}

export const sortTabs: { id: GallerySortTab; label: string }[] = [
  { id: 'newest', label: 'Son Eklenenler' },
  { id: 'topRated', label: 'En Yüksek Puanlı' },
]
