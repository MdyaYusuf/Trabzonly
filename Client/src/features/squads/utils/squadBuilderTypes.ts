export type BuilderFormationId =
  | '4-2-3-1'
  | '4-3-3'
  | '4-3-1-2'
  | '4-1-4-1'
  | '4-4-2'
  | '4-4-1-1'
  | '4-5-1'
  | '3-5-2'
  | '3-4-3'
  | '3-4-1-2'
  | '3-4-2-1'
  | '5-3-2'

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
  | 'CDM'
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

export type BenchSlotId =
  | 'BENCH_1'
  | 'BENCH_2'
  | 'BENCH_3'
  | 'BENCH_4'
  | 'BENCH_5'
  | 'BENCH_6'
  | 'BENCH_7'
  | 'BENCH_8'
  | 'BENCH_9'
  | 'BENCH_10'

export type AssignmentSlotId = BuilderSlotId | BenchSlotId

export type BuilderPlayer = {
  id: string
  name: string
  shortName: string
  number: string
  posGroup: Exclude<BuilderPosGroup, 'ALL'>
  roleHint: string
  age: number
  marketValueM: number
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

export type AttackStyleOption = 'Baskılı' | 'Dengeli' | 'Kontra'
export type DefenseLineOption = 'Yüksek' | 'Dengeli' | 'Derin'
export type TempoOption = 'Yüksek' | 'Normal' | 'Düşük'
