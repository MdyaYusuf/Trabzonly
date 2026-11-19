import { PlayerCategory } from '../playerTypes'

export type PositionGroup = 'all' | 'gk' | 'def' | 'mid' | 'fwd'
export type SortOption = 'value-desc' | 'rating-desc' | 'number-asc' | 'apps-desc'

export type PlayerCardStat = {
  label: string
  value: string
}

export type PlayerCardData = {
  id: number
  number: number
  name: string
  nationality: string
  positionGroup: PositionGroup
  positionCode: string
  positionLabel: string
  rating: number
  height: string
  subtitle: string
  note: string
  marketValue: number | null
  showMarketValue: boolean
  badge?: { label: string; tone: 'bordo' | 'mavi' | 'neutral' }
  stats: PlayerCardStat[]
  tone: string
  flagUrl?: string | null
  commentCount: number
  description?: string | null
  goals?: number
  assists?: number | null
  category: PlayerCategory
}

export const PAGE_SIZE = 6

export const DIRECTORY_CATEGORY_TABS: {
  category: PlayerCategory
  label: string
  listTitle: string
}[] = [
  {
    category: PlayerCategory.Current,
    label: 'Güncel Kadro',
    listTitle: 'GÜNCEL KADRO',
  },
  {
    category: PlayerCategory.Legend,
    label: 'Efsaneler',
    listTitle: 'EFSANELER',
  },
  {
    category: PlayerCategory.TransferTarget,
    label: 'Transfer Hedefleri',
    listTitle: 'TRANSFER HEDEFLERİ',
  },
]

export const DIRECTORY_CATEGORY_QUERY_KEY = 'kategori'

const DIRECTORY_CATEGORY_SLUGS: Record<PlayerCategory, string> = {
  [PlayerCategory.Current]: 'guncel',
  [PlayerCategory.Legend]: 'efsaneler',
  [PlayerCategory.TransferTarget]: 'transfer',
}

export function parseDirectoryCategory(slug: string | null | undefined): PlayerCategory {
  if (slug === DIRECTORY_CATEGORY_SLUGS[PlayerCategory.Legend]) {
    return PlayerCategory.Legend
  }

  if (slug === DIRECTORY_CATEGORY_SLUGS[PlayerCategory.TransferTarget]) {
    return PlayerCategory.TransferTarget
  }

  return PlayerCategory.Current
}

export function directoryCategorySlug(category: PlayerCategory): string {
  return DIRECTORY_CATEGORY_SLUGS[category]
}

export function directoryCategoryPath(category: PlayerCategory): string {
  if (category === PlayerCategory.Current) {
    return '/oyuncular'
  }

  return `/oyuncular?${DIRECTORY_CATEGORY_QUERY_KEY}=${directoryCategorySlug(category)}`
}
