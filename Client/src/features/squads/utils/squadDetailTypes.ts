export type PitchOverlayMode = 'none' | 'heatmap' | 'press'

export type SquadPitchPlayer = {
  id: string
  shortName: string
  fullName: string
  number: string
  positionLabel: string
  roleLabel: string
  left: string
  top?: string
  bottom?: string
  centerX?: boolean
  ringTone: 'primary' | 'primary-container' | 'secondary' | 'surface' | 'secondary-container'
  numberTone: 'primary' | 'secondary' | 'tertiary'
  roleTone: 'primary' | 'secondary' | 'primary-container' | 'surface' | 'on-surface'
  positionTone: 'primary' | 'secondary' | 'tertiary'
  isCaptain?: boolean
  avatarInitials: string
  avatarGradient: string
}

export type SquadBenchPlayer = {
  number: string
  position: string
  name: string
  role: string
  roleTone: 'primary' | 'secondary' | 'tertiary' | 'muted' | 'bold-primary'
}

export type SquadInstruction = {
  title: string
  headline: string
  body: string
  headlineTone?: 'primary' | 'default'
}

export type SquadDetailComment = {
  id: string
  initials: string
  displayName: string
  badge?: string
  badgeTone?: 'surface' | 'secondary'
  avatarTone: 'primary' | 'secondary' | 'primary-container'
  timeLabel: string
  body: string
  upvotes: number
  downvotes: number
  replyCount: number
}

export type SquadDetailProfile = {
  id: string
  title: string
  formationBadge: string
  venueBadge: string
  verifiedBadge: string
  authorInitials: string
  authorUsername: string
  authorBadge: string
  publishedLabel: string
  locationLabel: string
  rating: number
  ratingCount: number
  approvalPercent: string
  commentCount: number
  viewsLabel: string
  tacticFitPercent: string
  pitchPlayers: SquadPitchPlayer[]
  benchPlanLabel: string
  benchPlayers: SquadBenchPlayer[]
  instructions: SquadInstruction[]
  avgAge: string
  avgAgeCaption: string
  totalValue: string
  totalValueCaption: string
  foreignRuleLabel: string
  foreignRuleDetail: string
  authorNote: string
  authorNoteCredit: string
  comments: SquadDetailComment[]
}
