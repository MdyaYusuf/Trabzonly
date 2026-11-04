import type { RoleSortOption } from '@/features/roles/roleTypes'

export type AdminRoleKindFilter = 'all' | 'system' | 'custom'

export type AdminRoleSort = RoleSortOption

export type AdminRoleListRow = {
  id: number
  name: string
  memberCount: number
  isSystem: boolean
  statusLabel: string
  createdDate: string
}

export type AdminRoleFormDraft = {
  id: number | null
  name: string
  isSystem: boolean
  memberCount: number
  createdDate?: string | null
  updatedDate?: string | null
}
