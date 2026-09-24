export type AdminStatisticPositionGroup = 'all' | 'gk' | 'def' | 'mid' | 'att'

export type AdminStatisticSort =
  | 'goals-desc'
  | 'assists-desc'
  | 'matches-desc'
  | 'minutes-desc'

export type AdminStatisticListRow = {
  id: string
  playerName: string
  number: number
  positionCode: string
  positionGroup: Exclude<AdminStatisticPositionGroup, 'all'>
  nationality: string
  season: string
  team: string
  matches: number
  minutesLabel: string
  minutes: number
  goals: number
  assists: number
  yellowCards: number
  redCards: number
  cleanSheets: number | null
  saves: number | null
  goalsConceded: number | null
  isVerified?: boolean
  initials: string
  avatarTone: string
}

export type AdminStatisticFormDraft = {
  id: string
  recordCode: string
  playerId: string
  playerName: string
  playerNumber: string
  playerPosition: string
  season: string
  team: string
  matches: string
  minutes: string
  goals: string
  goalsBreakdown: string
  assists: string
  yellowCards: string
  redCards: string
  cleanSheets: string
  saves: string
  goalsConceded: string
  minutesPerGoalLabel: string
  minutesPerGoalNote: string
  previewPositionBadge: string
  lastUpdated: string
  seasonStatus: string
  apiSyncLabel: string
  initials: string
  avatarTone: string
}
