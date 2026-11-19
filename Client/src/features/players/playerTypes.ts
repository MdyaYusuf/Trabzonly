import type { PositionZone } from '@/features/positions/positionTypes'

export const PlayerCategory = {
  Current: 0,
  Legend: 1,
  TransferTarget: 2,
} as const

export type PlayerCategory = (typeof PlayerCategory)[keyof typeof PlayerCategory]

// Responses
export interface PlayerSeasonStatsDto {
  appearances: number
  minutesPlayed?: number | null
  goals: number
  assists: number
  cleanSheets: number
  yellowCards?: number | null
  redCards?: number | null
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
  currentTeam?: string | null
  description?: string
  imageUrl?: string
  shirtNumber?: number | null
  averageRating: number
  ratingCount: number
  isActive: boolean
  isCaptain: boolean
  category: PlayerCategory
  positionId: number
  positionName: string
  positionAbbreviation: string
  positionZone: PositionZone
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
  currentTeam?: string | null
  imageUrl?: string
  shirtNumber?: number | null
  averageRating: number
  ratingCount: number
  category: PlayerCategory
  positionName: string
  positionAbbreviation: string
  positionZone: PositionZone
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
  /** Defaults to Current when omitted by the client service */
  category?: PlayerCategory
  sort?: PlayerSortOption
}

export interface PlayerAdminListQuery {
  pageNumber?: number
  pageSize?: number
  search?: string
  positionGroup?: PlayerPositionGroup
  /** Defaults to Current when omitted by the client service */
  category?: PlayerCategory
  /** undefined = all, true = active, false = inactive */
  isActive?: boolean
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
  currentTeam?: string | null
  description?: string
  shirtNumber?: number | null
  positionId: number
  isCaptain: boolean
  category: PlayerCategory
  imageFile?: File | null
}

export interface UpdatePlayerRequest extends CreatePlayerRequest {
  id: number
  isActive: boolean
}

export interface RatePlayerRequest {
  score: number
}
