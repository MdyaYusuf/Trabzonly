export type AdminPlayerStatus = 'active' | 'injured' | 'inactive'

export type AdminPlayerPositionGroup = 'all' | 'gk' | 'def' | 'mid' | 'att'

export type AdminPlayerSquadFilter = 'all' | 'first-team' | 'loan' | 'u19'

export type AdminPlayerStatusFilter = 'all' | 'active' | 'inactive'

export type AdminPlayerListRow = {
  id: string
  number: number
  fullName: string
  secondaryName: string
  positionLabel: string
  positionGroup: Exclude<AdminPlayerPositionGroup, 'all'>
  squadLabel: string
  squadFilter: Exclude<AdminPlayerSquadFilter, 'all'>
  nationality: string
  nationalityFlag: string
  age: number
  marketValueLabel: string
  marketValueMillions: number
  status: AdminPlayerStatus
  statusLabel: string
  isCaptain?: boolean
  isViceCaptain?: boolean
  initials: string
  avatarTone: string
}

export type AdminPlayerListStats = {
  totalLabel: string
  totalValue: string
  activeLabel: string
  activeValue: string
  inactiveLabel: string
  inactiveValue: string
  positionDistribution: string
  positionNote: string
  averageAge: string
  averageAgeNote: string
  nationalCount: string
  nationalNote: string
  reportTitle: string
  reportSubtitle: string
  reportNote: string
}

export type AdminPlayerReportStrip = {
  kicker: string
  message: string
  marketValueTotal: string
  foreignQuota: string
}

export type AdminPlayerFormDraft = {
  id: string
  recordCode: string
  fullName: string
  jerseyNumber: string
  birthDate: string
  nationality: string
  preferredFoot: 'right' | 'left' | 'both'
  isActiveInSquad: boolean
  heightCm: string
  weightKg: string
  primaryPosition: string
  secondaryPosition: string
  currentSquad: string
  contractEnd: string
  marketValue: string
  annualSalary: string
  tacticalProfile: string
  createdBy: string
  lastUpdated: string
  tffLicenseCode: string
  contractTypeLabel: string
  initials: string
  avatarTone: string
}
