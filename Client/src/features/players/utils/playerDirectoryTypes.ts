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
  assists?: number
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
    label: 'Kadro',
    listTitle: 'KADRO LİSTESİ',
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
