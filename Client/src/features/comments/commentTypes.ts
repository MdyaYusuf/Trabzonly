// Responses
export interface CommentResponseDto {
  id: string;
  content: string;
  isApproved: boolean;
  userId: string;
  authorUsername: string;
  blogId?: string;
  playerId?: string;
  parentCommentId?: string;
  createdDate: string;
}

export interface CreatedCommentResponseDto {
  id: string;
  content: string;
  isApproved: boolean;
}

// Requests
export interface CreateCommentRequest {
  content: string;
  blogId?: string;
  playerId?: string;
  parentCommentId?: string;
}

export interface UpdateCommentRequest {
  id: string;
  content: string;
}