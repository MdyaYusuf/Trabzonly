import type { PollAdminSortOption, PollScope } from '@/features/polls/pollTypes'

export type AdminPollStatusFilter = 'all' | 'active' | 'passive'

export type AdminPollScopeFilter = 'all' | PollScope

export type AdminPollSort = PollAdminSortOption

export type AdminPollStatus = 'active' | 'passive'

export type AdminPollListRow = {
  id: number
  question: string
  scope: PollScope
  scopeLabel: string
  targetLabel: string
  optionCount: number
  totalVotes: number
  status: AdminPollStatus
  statusLabel: string
  isActive: boolean
}

export type AdminPollOptionDraft = {
  key: string
  label: string
}

export type AdminPollFormDraft = {
  id: number | null
  question: string
  scope: PollScope
  playerId: number | null
  playerName: string | null
  postId: string | null
  postTitle: string | null
  isActive: boolean
  options: AdminPollOptionDraft[]
  optionsLocked: boolean
  totalVotes: number
  createdDate?: string | null
  updatedDate?: string | null
}
