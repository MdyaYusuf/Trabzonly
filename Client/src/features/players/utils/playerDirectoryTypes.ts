export type PositionGroup = 'all' | 'gk' | 'def' | 'mid' | 'fwd'
export type SortOption = 'value-desc' | 'rating-desc' | 'number-asc' | 'apps-desc'
export type NationFilter = 'all' | 'domestic' | 'foreign'

export type PlayerCardStat = {
  label: string
  value: string
}

export type PlayerCardData = {
  id: string
  number: number
  name: string
  nationality: string
  isDomestic: boolean
  positionGroup: PositionGroup
  positionCode: string
  positionLabel: string
  rating: number
  age: number
  height: string
  note: string
  marketValue: number
  badge?: { label: string; tone: 'bordo' | 'mavi' | 'neutral' }
  stats: PlayerCardStat[]
  tone: string
  commentCount: number
  description?: string | null
  goals?: number
  assists?: number
}

export const PAGE_SIZE = 12
