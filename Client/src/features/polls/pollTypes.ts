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

export interface VotePollRequest {
  optionId: number
}
