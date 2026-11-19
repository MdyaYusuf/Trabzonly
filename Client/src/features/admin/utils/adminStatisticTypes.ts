import type {
  PlayerStatsPositionGroup,
  PlayerStatsSortOption,
} from '@/features/stats/playerStatsTypes'

export type AdminStatisticPositionGroup = PlayerStatsPositionGroup

export type AdminStatisticSort = PlayerStatsSortOption

export type AdminStatisticListRow = {
  id: number
  playerId: number
  playerName: string
  number: number | null
  positionCode: string
  nationality: string
  seasonId: number
  season: string
  team: string
  matches: number
  goals: number
  assists: number | null
  yellowCards: number | null
  redCards: number | null
  cleanSheets: number | null
  goalsConceded: number | null
  initials: string
}

export type AdminStatisticFormDraft = {
  id: number | null
  playerId: number
  seasonId: number
  team: string
  matches: string
  goals: string
  assists: string
  yellowCards: string
  redCards: string
  cleanSheets: string
  goalsConceded: string
  createdDate?: string | null
}

export type AdminStatisticPlayerOption = {
  id: number
  label: string
}

export type AdminStatisticSeasonOption = {
  id: number
  name: string
}
