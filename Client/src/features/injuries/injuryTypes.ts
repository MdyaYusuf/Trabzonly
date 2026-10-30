// Responses
export interface InjuryResponseDto {
  id: number
  name: string
  daysInjured: number
  gamesMissed: number
  playerId: number
  playerName: string
  shirtNumber?: number | null
  nationality: string
  positionName: string
  positionAbbreviation: string
  seasonId?: number | null
  seasonName?: string | null
  createdDate: string
}

export interface CreatedInjuryResponseDto {
  id: number
  name: string
  playerId: number
}

export interface InjuryAdminListQuery {
  pageNumber?: number
  pageSize?: number
  search?: string
  seasonId?: number
  playerId?: number
}

// Requests
export interface CreateInjuryRequest {
  name: string
  daysInjured: number
  gamesMissed: number
  playerId: number
  seasonId?: number | null
}

export interface UpdateInjuryRequest {
  id: number
  name: string
  daysInjured: number
  gamesMissed: number
  playerId: number
  seasonId?: number | null
}
