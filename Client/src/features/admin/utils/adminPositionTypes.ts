import type { PositionSortOption, PositionZone } from '@/features/positions/positionTypes'

export type AdminPositionZoneFilter = 'all' | PositionZone

export type AdminPositionSort = PositionSortOption

export type AdminPositionListRow = {
  id: number
  name: string
  abbreviation: string
  zone: PositionZone
  zoneLabel: string
  roleNames: string[]
}

export type AdminPositionRoleDraft = {
  clientKey: string
  id: number | null
  name: string
  description: string
  sortOrder: number
}

export type AdminPositionFormDraft = {
  id: number | null
  name: string
  abbreviation: string
  zone: PositionZone
  roles: AdminPositionRoleDraft[]
  createdDate?: string | null
  updatedDate?: string | null
}
