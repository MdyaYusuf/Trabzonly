import type { SeasonSortOption } from '@/features/seasons/seasonTypes'

export type AdminSeasonStatusFilter = 'all' | 'active' | 'inactive'

export type AdminSeasonSort = SeasonSortOption

export type AdminSeasonListRow = {
  id: number
  name: string
  startDateLabel: string
  endDateLabel: string
  isActive: boolean
  statusLabel: string
  createdDate?: string | null
  updatedDate?: string | null
}

export type AdminSeasonFormDraft = {
  id: number | null
  name: string
  startDate: string
  endDate: string
  isActive: boolean
  createdDate?: string | null
  updatedDate?: string | null
}
