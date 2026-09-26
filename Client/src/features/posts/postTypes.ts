// Responses
export interface PostResponseDto {
  id: string;
  title: string;
  description?: string;
  content: string;
  imageUrl?: string;
  isActive: boolean;
  likeCount: number;
  dislikeCount: number;
  commentCount: number;
  createdDate: string;
  userId: string;
  authorUsername: string;
  categoryId: number;
  categoryName: string;
}

export interface CreatedPostResponseDto {
  id: string;
  title: string;
  imageUrl?: string;
}

export interface PostPreviewDto {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  authorUsername: string;
  categoryName: string;
  createdDate: string;
  likeCount: number;
  dislikeCount: number;
  commentCount: number;
}

// Requests
export interface CreatePostRequest {
  title: string;
  description?: string;
  content: string;
  categoryId: number;
  imageFile?: File | null;
}

export interface UpdatePostRequest extends CreatePostRequest {
  id: string;
  isActive: boolean;
}

export type PostReactionType = 1 | 2;

export interface PostReactionResponseDto {
  postId: string;
  likeCount: number;
  dislikeCount: number;
  currentReaction?: PostReactionType | null;
}
