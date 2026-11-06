export interface PollOptionResponseDto {
  id: number
  label: string
  sortOrder: number
  voteCount: number
  percentage: number
}

export interface PollResponseDto {
  id: number
  question: string
  isActive: boolean
  playerId?: number | null
  postId?: string | null
  totalVotes: number
  currentUserOptionId?: number | null
  options: PollOptionResponseDto[]
}

export type PollScope = 'global' | 'player' | 'post'

export interface PollAdminListItemDto {
  id: number
  question: string
  isActive: boolean
  scope: PollScope
  playerId?: number | null
  playerName?: string | null
  postId?: string | null
  postTitle?: string | null
  optionCount: number
  totalVotes: number
  createdDate: string
  updatedDate?: string | null
}

export interface PollAdminDetailDto {
  id: number
  question: string
  isActive: boolean
  scope: PollScope
  playerId?: number | null
  playerName?: string | null
  postId?: string | null
  postTitle?: string | null
  totalVotes: number
  optionsLocked: boolean
  createdDate: string
  updatedDate?: string | null
  options: PollOptionResponseDto[]
}

export type PollAdminSortOption = 'newest' | 'oldest' | 'votes-desc' | 'votes-asc'

export interface PollAdminListQuery {
  search?: string
  isActive?: boolean
  scope?: PollScope
  sort?: PollAdminSortOption
  pageNumber?: number
  pageSize?: number
}

export interface CreatePollOptionRequest {
  label: string
  sortOrder: number
}

export interface CreatePollRequest {
  question: string
  playerId?: number | null
  postId?: string | null
  isActive: boolean
  options: CreatePollOptionRequest[]
}

export interface UpdatePollRequest {
  id: number
  question: string
  isActive: boolean
  options?: CreatePollOptionRequest[] | null
}

export interface VotePollRequest {
  optionId: number
}
