// Responses
export type CommentReactionType = 1 | 2

export const CommentReaction = {
  Like: 1 as CommentReactionType,
  Dislike: 2 as CommentReactionType,
}

export type CommentSort = 'liked' | 'newest'

export interface CommentResponseDto {
  id: string
  content: string
  isApproved: boolean
  likeCount: number
  dislikeCount: number
  userId: string
  authorUsername: string
  authorDisplayTag?: string | null
  postId?: string
  playerId?: number
  squadId?: string
  parentCommentId?: string
  createdDate: string
  currentUserReaction?: CommentReactionType | null
}

export interface CreatedCommentResponseDto {
  id: string
  content: string
  isApproved: boolean
}

export interface CommentReactionResponseDto {
  commentId: string
  likeCount: number
  dislikeCount: number
  currentReaction?: CommentReactionType | null
}

// Requests
export interface CreateCommentRequest {
  content: string
  postId?: string
  playerId?: number
  squadId?: string
  parentCommentId?: string
}

export interface UpdateCommentRequest {
  id: string
  content: string
}
