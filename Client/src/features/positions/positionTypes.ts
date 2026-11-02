export const PositionZone = {
  Goalkeeper: 0,
  Defence: 1,
  Midfield: 2,
  Attack: 3,
} as const

export type PositionZone = (typeof PositionZone)[keyof typeof PositionZone]

export type PositionSortOption = 'name-asc' | 'abbreviation-asc' | 'zone-asc'

// Responses
export interface PositionRoleResponseDto {
  id: number
  name: string
  description: string
  sortOrder: number
}

export interface PositionResponseDto {
  id: number
  name: string
  abbreviation: string
  zone: PositionZone
  createdDate: string
  updatedDate?: string | null
  roles: PositionRoleResponseDto[]
}

export interface PositionAdminListQuery {
  search?: string
  zone?: PositionZone
  sort?: PositionSortOption
}

// Requests
export interface PositionRoleRequest {
  id?: number | null
  name: string
  description: string
  sortOrder: number
}

export interface CreatePositionRequest {
  name: string
  abbreviation: string
  zone: PositionZone
  roles: PositionRoleRequest[]
}

export interface UpdatePositionRequest {
  id: number
  name: string
  abbreviation: string
  zone: PositionZone
  roles: PositionRoleRequest[]
}
