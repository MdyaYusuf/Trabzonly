export type MySquadStatus = 'published' | 'draft'
export type MySquadFilter = 'all' | 'published' | 'draft' | 'popular'
export type MySquadSort = 'newest' | 'rating' | 'comments'
export type MySquadCardVariant = 'featured' | 'compact' | 'draft'

export type MySquadPitchPlayer = {
  number: string
  name: string
  tone: 'accent' | 'light' | 'surface' | 'gold'
}

export type MySquadKeyRole = {
  name: string
  role: string
}

export type MySquadCardData = {
  id: string
  title: string
  excerpt: string
  status: MySquadStatus
  isPopular: boolean
  variant: MySquadCardVariant
  formationLabel: string
  updatedLabel: string
  tags: string[]
  rating?: number
  ratingCount?: number
  viewsLabel?: string
  commentCount?: number
  shareCount?: number
  lineupPreview?: string
  keyRoles?: MySquadKeyRole[]
  pitchRows?: MySquadPitchPlayer[][]
  pitchFooter?: [string, string]
  strategyStats?: { label: string; value: string }[]
  draftProgress?: number
  draftMissing?: string
  draftPlayerCount?: string
}
