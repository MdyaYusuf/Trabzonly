import { PlayerCategory } from '@/features/players/playerTypes'

export type SquadPoolCategoryToggle = {
  category: PlayerCategory
  label: string
}

export const SQUAD_POOL_CATEGORY_TOGGLES: SquadPoolCategoryToggle[] = [
  { category: PlayerCategory.Current, label: 'Güncel Kadro' },
  { category: PlayerCategory.Legend, label: 'Efsaneler' },
  { category: PlayerCategory.TransferTarget, label: 'Transfer Hedefleri' },
]

export const DEFAULT_ENABLED_POOL_CATEGORIES: PlayerCategory[] = [
  PlayerCategory.Current,
]

export function builderBadgeClass(tone: 'bordo' | 'mavi'): string {
  if (tone === 'mavi') {
    return 'bg-secondary text-on-secondary'
  }

  return 'bg-primary text-on-primary'
}
