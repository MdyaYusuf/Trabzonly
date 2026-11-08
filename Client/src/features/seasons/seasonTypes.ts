// Responses
export interface SeasonResponseDto {
  id: number
  name: string
  startDate: string
  endDate: string
  isActive: boolean
  displayedFixtureWeek: number
  createdDate: string
  updatedDate?: string | null
}

export interface SeasonAdminSummaryDto {
  totalCount: number
  activeCount: number
  inactiveCount: number
}

export type SeasonSortOption = 'start-desc' | 'start-asc'

export interface SeasonAdminListQuery {
  pageNumber?: number
  pageSize?: number
  search?: string
  isActive?: boolean
  sort?: SeasonSortOption
}

// Requests
export interface CreateSeasonRequest {
  name: string
  startDate: string
  endDate: string
  isActive: boolean
}

export interface UpdateSeasonRequest {
  id: number
  name: string
  startDate: string
  endDate: string
  isActive: boolean
}

export interface UpdateDisplayedFixtureWeekRequest {
  seasonId: number
  displayedFixtureWeek: number
}
