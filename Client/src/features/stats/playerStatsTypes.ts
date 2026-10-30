// Responses
export interface PlayerStatsResponseDto {
  id: number
  team: string
  appearances: number
  minutesPlayed: number
  goals: number
  assists: number
  yellowCards: number
  redCards: number
  cleanSheets: number
  goalsConceded: number
  playerId: number
  playerName: string
  shirtNumber?: number | null
  nationality: string
  positionName: string
  positionAbbreviation: string
  seasonId: number
  seasonName: string
  createdDate: string
}

export interface CreatedPlayerStatsResponseDto {
  id: number
  team: string
  playerId: number
  seasonId: number
}

export type PlayerStatsPositionGroup = 'all' | 'gk' | 'def' | 'mid' | 'fwd'
export type PlayerStatsSortOption =
  | 'goals-desc'
  | 'assists-desc'
  | 'matches-desc'
  | 'minutes-desc'

export interface PlayerStatsAdminListQuery {
  pageNumber?: number
  pageSize?: number
  search?: string
  seasonId?: number
  playerId?: number
  team?: string
  positionGroup?: PlayerStatsPositionGroup
  sort?: PlayerStatsSortOption
}

// Requests
export interface CreatePlayerStatsRequest {
  team: string
  appearances: number
  minutesPlayed: number
  goals: number
  assists: number
  yellowCards: number
  redCards: number
  cleanSheets: number
  goalsConceded: number
  playerId: number
  seasonId: number
}

export interface UpdatePlayerStatsRequest {
  id: number
  team: string
  appearances: number
  minutesPlayed: number
  goals: number
  assists: number
  yellowCards: number
  redCards: number
  cleanSheets: number
  goalsConceded: number
  playerId: number
  seasonId: number
}
