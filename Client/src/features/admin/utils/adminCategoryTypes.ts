import type { CategorySortOption } from '@/features/categories/categoryTypes'

export type AdminCategoryStatusFilter = 'all' | 'active' | 'inactive'

export type AdminCategorySort = CategorySortOption

export type AdminCategoryListRow = {
  id: number
  name: string
  description: string
  postCount: number
  isActive: boolean
  statusLabel: string
}

export type AdminCategoryFormDraft = {
  id: number | null
  name: string
  description: string
  isActive: boolean
  createdDate?: string | null
  updatedDate?: string | null
}
