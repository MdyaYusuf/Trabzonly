// Responses
export interface SquadSlotResponseDto {
  id: string
  slotKey: string
  sortOrder: number
  playerId: number
  playerName: string
  playerImageUrl?: string
  positionAbbreviation: string
  playerShirtNumber?: number | null
  age: number
  marketValue?: number | null
}

export interface SquadResponseDto {
  id: string
  title: string
  formation: string
  notes: string
  attackStyle: string
  defenseLine: string
  tempo: string
  captainPlayerId: number
  cornerTakerPlayerId: number
  freeKickTakerPlayerId: number
  userId: string
  authorUsername: string
  authorDisplayTag?: string | null
  averageRating: number
  ratingCount: number
  viewCount: number
  commentCount: number
  createdDate: string
  slots: SquadSlotResponseDto[]
  currentUserScore?: number | null
  isAuthorFollowedByCurrentUser?: boolean
}

export interface CreatedSquadResponseDto {
  id: string
  title: string
  formation: string
}

export interface SquadPreviewDto {
  id: string
  title: string
  formation: string
  notes: string
  attackStyle: string
  defenseLine: string
  tempo: string
  captainPlayerId: number
  cornerTakerPlayerId: number
  freeKickTakerPlayerId: number
  userId: string
  authorUsername: string
  authorDisplayTag?: string | null
  averageRating: number
  ratingCount: number
  viewCount: number
  commentCount: number
  createdDate: string
  slots: SquadSlotResponseDto[]
}

export interface SquadRatingResponseDto {
  squadId: string
  score: number
  averageRating: number
  ratingCount: number
}

// Requests
export interface SquadSlotRequest {
  slotKey: string
  sortOrder: number
  playerId: number
}

export interface CreateSquadRequest {
  title: string
  formation: string
  notes: string
  attackStyle: string
  defenseLine: string
  tempo: string
  captainPlayerId: number
  cornerTakerPlayerId: number
  freeKickTakerPlayerId: number
  slots: SquadSlotRequest[]
}

export interface UpdateSquadRequest extends CreateSquadRequest {
  id: string
}

export interface RateSquadRequest {
  score: number
}

export type SquadListSort = 'newest' | 'topRated'

export type SquadListQuery = {
  pageNumber: number
  pageSize: number
  sort?: SquadListSort
  search?: string
}
