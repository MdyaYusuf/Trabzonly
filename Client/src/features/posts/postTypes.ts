// Responses
export interface PostPollOptionSummaryDto {
  id: number;
  label: string;
  sortOrder: number;
  voteCount: number;
}

export interface PostPollSummaryDto {
  id: number;
  question: string;
  totalVotes: number;
  options: PostPollOptionSummaryDto[];
}

export interface PostTopCommentDto {
  id: string;
  content: string;
  authorUsername: string;
  authorDisplayTag?: string | null;
  likeCount: number;
}

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
  authorDisplayTag?: string | null;
  categoryId: number;
  categoryName: string;
  poll?: PostPollSummaryDto | null;
  topComment?: PostTopCommentDto | null;
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
export interface CreatePostPollRequest {
  question: string;
  options: string[];
}

export interface CreatePostRequest {
  title: string;
  description?: string;
  content: string;
  categoryId: number;
  imageFile?: File | null;
  poll?: CreatePostPollRequest | null;
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

export type PostFeedSort = 'newest' | 'popular' | 'discussed';

export interface PostListQuery {
  pageNumber?: number;
  pageSize?: number;
  categoryId?: number;
  search?: string;
  sort?: PostFeedSort;
}
