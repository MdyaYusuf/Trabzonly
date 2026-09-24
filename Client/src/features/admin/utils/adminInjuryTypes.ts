export type AdminInjuryStatusFilter = 'all' | 'active' | 'match-form' | 'recovered'

export type AdminInjuryStatus = 'active' | 'match-form' | 'recovered'

export type AdminInjuryStage = 'rest' | 'individual' | 'warmup' | 'ready'

export type AdminInjuryCategory =
  | 'muscle'
  | 'ligament'
  | 'fracture'
  | 'post-op'
  | 'other'

export type AdminInjuryListRow = {
  id: string
  playerName: string
  number: number
  positionLabel: string
  diagnosis: string
  diagnosisDetail: string
  status: AdminInjuryStatus
  statusLabel: string
  days: number
  missedMatches: number
  season: string
  recordedAt: string
  initials: string
  avatarTone: string
}

export type AdminInjuryFormDraft = {
  id: string
  recordCode: string
  statusBadge: string
  playerId: string
  playerName: string
  playerNumber: string
  playerNationality: string
  playerPosition: string
  contractLabel: string
  season: string
  category: AdminInjuryCategory
  tffCode: string
  diagnosis: string
  diagnosisDate: string
  expectedReturnDate: string
  expectedReturnNote: string
  totalDays: string
  missedMatches: string
  stage: AdminInjuryStage
  doctorNote: string
  pressTransferable: boolean
  previewDiagnosis: string
  daysInjuredLabel: string
  recoveryPercent: string
  returnMatchLabel: string
  currentStatusLabel: string
  ballWorkLabel: string
  lastCheckLabel: string
  initials: string
  avatarTone: string
  doctorName: string
  doctorTitle: string
  protocolNo: string
}
