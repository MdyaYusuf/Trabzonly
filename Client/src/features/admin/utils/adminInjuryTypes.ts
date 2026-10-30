export type AdminInjuryListRow = {
  id: number
  playerId: number
  playerName: string
  number: number | null
  positionCode: string
  nationality: string
  diagnosis: string
  days: number
  missedMatches: number
  seasonId: number | null
  season: string
  recordedAt: string
  initials: string
}

export type AdminInjuryFormDraft = {
  id: number | null
  playerId: number
  seasonId: number
  name: string
  daysInjured: string
  gamesMissed: string
  createdDate?: string | null
}

export type AdminInjuryPlayerOption = {
  id: number
  label: string
}

export type AdminInjurySeasonOption = {
  id: number
  name: string
}
