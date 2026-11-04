import type { UserAdminSortOption } from '@/features/users/userTypes'

export type AdminMemberStatusFilter = 'all' | 'active' | 'passive'

export type AdminMemberSort = UserAdminSortOption

export type AdminMemberRoleOption = {
  id: number
  name: string
}

export type AdminMemberListRow = {
  id: string
  username: string
  email: string
  profileImageUrl: string | null
  initials: string
  roleId: number
  roleName: string
  isAdmin: boolean
  isActive: boolean
  statusLabel: string
  postCount: number
  squadCount: number
  createdDateLabel: string
}

export type AdminMemberFormDraft = {
  id: string | null
  username: string
  email: string
  bio: string
  displayTag: string
  profileImageUrl: string | null
  roleId: number
  roleName: string
  isAdmin: boolean
  isActive: boolean
  clearProfileImage: boolean
  createdDate: string | null
  updatedDate: string | null
}
