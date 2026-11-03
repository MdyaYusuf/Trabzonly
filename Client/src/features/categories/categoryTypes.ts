// Responses
export interface CategoryResponseDto {
  id: number
  name: string
  description?: string | null
  isActive: boolean
  createdDate: string
  updatedDate?: string | null
}

export interface CategoryAdminListItemDto {
  id: number
  name: string
  description?: string | null
  isActive: boolean
  postCount: number
  createdDate: string
  updatedDate?: string | null
}

export interface CategoryAdminSummaryDto {
  totalCount: number
  activeCount: number
  inactiveCount: number
}

export type CategorySortOption = 'name-asc' | 'posts-asc' | 'posts-desc'

export interface CategoryAdminListQuery {
  search?: string
  isActive?: boolean
  sort?: CategorySortOption
}

// Requests
export interface CreateCategoryRequest {
  name: string
  description?: string | null
}

export interface UpdateCategoryRequest {
  id: number
  name: string
  description?: string | null
  isActive: boolean
}
