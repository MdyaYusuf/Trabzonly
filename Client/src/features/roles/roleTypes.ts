// Responses
export interface RoleResponseDto {
  id: number
  name: string
  isSystem: boolean
  createdDate: string
  updatedDate?: string | null
}

export interface RoleAdminListItemDto {
  id: number
  name: string
  memberCount: number
  isSystem: boolean
  createdDate: string
  updatedDate?: string | null
}

export type RoleSortOption = 'name-asc' | 'members-asc' | 'members-desc'

export interface RoleAdminListQuery {
  search?: string
  isSystem?: boolean
  sort?: RoleSortOption
}

// Requests
export interface CreateRoleRequest {
  name: string
}

export interface UpdateRoleRequest {
  id: number
  name: string
}
