export type AdminSeasonStatusFilter = 'all' | 'active' | 'archive'

export type AdminSeasonSort =
  | 'start-desc'
  | 'start-asc'
  | 'alpha'
  | 'matches'

export type AdminSeasonRowStatus =
  | 'planned'
  | 'active'
  | 'completed'
  | 'archive'
  | 'legendary'

export type AdminSeasonListRow = {
  id: string
  name: string
  subtitle: string
  startDateLabel: string
  endDateLabel: string
  startSortKey: string
  status: AdminSeasonRowStatus
  statusLabel: string
  details: string[]
  matchCount: number
  isLive?: boolean
  isLegendary?: boolean
  canDelete: boolean
}

export type AdminSeasonFormDraft = {
  id: string
  recordCode: string
  name: string
  startDate: string
  endDate: string
  isActive: boolean
  description: string
  leagueRankLabel: string
  leagueRankNote: string
  squadFillLabel: string
  squadFillNote: string
  scheduleLabel: string
  scheduleNote: string
  previewLeague: string
  previewWeekLabel: string
  linkedModules: Array<{
    id: string
    icon: string
    title: string
    value: string
  }>
  createdBy: string
  lastUpdated: string
}
