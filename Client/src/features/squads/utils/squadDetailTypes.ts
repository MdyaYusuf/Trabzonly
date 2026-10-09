export type SquadPitchPlayer = {
  id: string
  playerId: number
  shortName: string
  fullName: string
  number: string
  positionLabel: string
  left: string
  top: string
  isCaptain: boolean
  avatarInitials: string
  avatarGradient: string
}

export type SquadBenchPlayer = {
  playerId: number
  number: string
  position: string
  name: string
}

export type SquadInstructionRow = {
  title: string
  value: string
}

export type SquadDetailViewModel = {
  id: string
  title: string
  formation: string
  notes: string
  userId: string
  authorUsername: string
  authorDisplayTag?: string | null
  authorInitials: string
  publishedLabel: string
  rating: number
  ratingCount: number
  commentCount: number
  viewCount: number
  currentUserScore?: number | null
  isAuthorFollowedByCurrentUser: boolean
  attackStyle: string
  defenseLine: string
  tempo: string
  captainPlayerId: number
  cornerTakerName: string
  freeKickTakerName: string
  pitchPlayers: SquadPitchPlayer[]
  benchPlayers: SquadBenchPlayer[]
  instructions: SquadInstructionRow[]
  avgAge: string
  avgAgeCaption: string
  totalValue: string
  totalValueCaption: string
  authorNoteCredit: string
}

export const ratingScores = ['1.0', '2.0', '3.0', '3.5', '4.0', '4.5', '5.0'] as const

export type RatingScore = (typeof ratingScores)[number]

export const ratingFeedbackMap: Record<RatingScore, string> = {
  '1.0': 'Zayıf Taktik (Geliştirilmeli)',
  '2.0': 'Eksik Dizilim (Savunma Zafiyeti Var)',
  '3.0': 'Orta Seviye Plan',
  '3.5': 'İyi Kurgulanmış Kadro',
  '4.0': 'Çok Başarılı Taktik',
  '4.5': 'Harika Taktik!',
  '5.0': 'Kusursuz Karadeniz Fırtınası!',
}
