export type BuilderFormationId =
  | '4-2-3-1'
  | '4-3-3'
  | '3-5-2'
  | '4-4-2'
  | '3-4-1-2'

export type BuilderPosGroup = 'ALL' | 'FW' | 'MF' | 'DF' | 'GK'

export type BuilderSlotId =
  | 'GK'
  | 'LB'
  | 'LCB'
  | 'CB'
  | 'RCB'
  | 'RB'
  | 'LWB'
  | 'RWB'
  | 'LDM'
  | 'RDM'
  | 'LCM'
  | 'CM'
  | 'RCM'
  | 'LM'
  | 'RM'
  | 'LW'
  | 'CAM'
  | 'RW'
  | 'ST'
  | 'ST2'

export type BuilderPlayer = {
  id: string
  name: string
  shortName: string
  number: string
  posGroup: Exclude<BuilderPosGroup, 'ALL'>
  roleHint: string
  age: number
  isDomestic: boolean
  marketValueM: number
  badge?: string
  badgeTone?: 'wizard' | 'domestic'
  avatarGradient: string
  initials: string
}

export type FormationSlot = {
  id: BuilderSlotId
  label: string
  roleLabel: string
}

export type FormationConfig = {
  id: BuilderFormationId
  label: string
  lineLabel: string
  rows: FormationSlot[][]
}
