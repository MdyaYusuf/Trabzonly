export type AdminPositionZone = 'all' | 'attack' | 'midfield' | 'defence' | 'goalkeeper'

export type AdminPositionSort =
  | 'players-desc'
  | 'players-asc'
  | 'alpha'
  | 'zone'

export type AdminPositionListRow = {
  id: string
  name: string
  roleLabel: string
  abbreviation: string
  zone: Exclude<AdminPositionZone, 'all'>
  zoneLabel: string
  playerCount: number
  playerCountLabel: string
  samplePlayers: string
  statusLabel: string
  icon: string
  zoneOrder: number
}

export type AdminPositionLinkedPlayer = {
  id: string
  numberLabel: string
  name: string
  roleNote: string
  preferenceLabel: string
}

export type AdminPositionFormDraft = {
  id: string
  recordCode: string
  name: string
  abbreviation: string
  zone: 'goalkeeper' | 'defence' | 'midfield' | 'attack'
  zoneSelectLabel: string
  description: string
  isActive: boolean
  federationNote: string
  previewNumber: string
  previewPlayerName: string
  previewRoleLine: string
  formationLabel: string
  linkedPlayers: AdminPositionLinkedPlayer[]
  depthLabel: string
  depthNote: string
  lastUpdated: string
}
