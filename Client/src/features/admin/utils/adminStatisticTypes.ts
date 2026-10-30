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
  minutesLabel: string
  minutes: number
  goals: number
  assists: number
  yellowCards: number
  redCards: number
  cleanSheets: number
  goalsConceded: number
  initials: string
}

export type AdminStatisticFormDraft = {
  id: number | null
  playerId: number
  seasonId: number
  team: string
  matches: string
  minutes: string
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
