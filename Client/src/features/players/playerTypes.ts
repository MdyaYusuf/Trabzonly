// Responses
export interface PlayerSeasonStatsDto {
  appearances: number
  minutesPlayed: number
  goals: number
  assists: number
  cleanSheets: number
  yellowCards: number
  redCards: number
  goalsConceded: number
  team: string
  seasonName: string
}

export interface PlayerResponseDto {
  id: number
  name: string
  nationality: string
  dateOfBirth: string
  age: number
  height?: number
  preferredFoot: string
  marketValue?: number
  wage?: number
  currentTeam: string
  description?: string
  imageUrl?: string
  shirtNumber?: number | null
  averageRating: number
  ratingCount: number
  isActive: boolean
  isDomestic: boolean
  isCaptain: boolean
  positionId: number
  positionName: string
  positionAbbreviation: string
  commentCount: number
  createdDate: string
  updatedDate?: string | null
  currentSeasonStats?: PlayerSeasonStatsDto | null
  currentUserScore?: number | null
}

export interface PlayerRosterOverviewDto {
  totalMarketValue: number
  activePlayerCount: number
  lastUpdated?: string | null
  currentSeasonName?: string | null
}

export interface CreatedPlayerResponseDto {
  id: number
  name: string
  imageUrl?: string
}

export interface PlayerPreviewDto {
  id: number
  name: string
  nationality: string
  age: number
  marketValue?: number
  currentTeam: string
  imageUrl?: string
  shirtNumber?: number | null
  averageRating: number
  ratingCount: number
  positionName: string
}

export interface PlayerRatingResponseDto {
  playerId: number
  score: number
  averageRating: number
  ratingCount: number
}

export type PlayerPositionGroup = 'all' | 'gk' | 'def' | 'mid' | 'fwd'
export type PlayerSortOption = 'value-desc' | 'rating-desc' | 'number-asc' | 'apps-desc'

export interface PlayerListQuery {
  pageNumber?: number
  pageSize?: number
  search?: string
  positionGroup?: PlayerPositionGroup
  isDomestic?: boolean
  sort?: PlayerSortOption
}

// Requests
export interface CreatePlayerRequest {
  name: string
  nationality: string
  dateOfBirth: string
  height?: number
  preferredFoot: string
  marketValue?: number
  wage?: number
  currentTeam: string
  description?: string
  shirtNumber?: number | null
  positionId: number
  isDomestic: boolean
  isCaptain: boolean
  imageFile?: File | null
}

export interface UpdatePlayerRequest extends CreatePlayerRequest {
  id: number
  isActive: boolean
}

export interface RatePlayerRequest {
  score: number
}
