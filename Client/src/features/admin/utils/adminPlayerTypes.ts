import type { PlayerPositionGroup } from '@/features/players/playerTypes'

export type AdminPlayerStatus = 'active' | 'inactive'

export type AdminPlayerStatusFilter = 'all' | 'active' | 'inactive'

export type AdminPlayerPositionFilter = PlayerPositionGroup

export type AdminPlayerPreferredFoot = 'Right' | 'Left' | 'Both'

export type AdminPlayerListRow = {
  id: number
  number: number | null
  fullName: string
  positionLabel: string
  currentTeam: string
  nationality: string
  age: number
  marketValueLabel: string
  status: AdminPlayerStatus
  statusLabel: string
  isCaptain: boolean
  imageUrl?: string | null
  initials: string
}

export type AdminPlayerFormDraft = {
  id: number | null
  name: string
  shirtNumber: string
  dateOfBirth: string
  nationality: string
  preferredFoot: AdminPlayerPreferredFoot
  isActive: boolean
  heightCm: string
  positionId: number
  currentTeam: string
  marketValue: string
  wage: string
  description: string
  isCaptain: boolean
  imageUrl?: string | null
  imageFile: File | null
  createdDate?: string | null
  updatedDate?: string | null
}
