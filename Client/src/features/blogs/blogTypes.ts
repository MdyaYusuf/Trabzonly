// Responses
export interface BlogResponseDto {
  id: string;
  title: string;
  description?: string;
  content: string;
  imageUrl?: string;
  isActive: boolean;
  userId: string;
  authorUsername: string;
  categoryId: number;
  categoryName: string;
}

export interface CreatedBlogResponseDto {
  id: string;
  title: string;
  imageUrl?: string;
}

export interface BlogPreviewDto {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  authorUsername: string;
  categoryName: string;
  createdDate: string;
}

// Requests
export interface CreateBlogRequest {
  title: string;
  description?: string;
  content: string;
  categoryId: number;
  imageFile?: File | null;
}

export interface UpdateBlogRequest extends CreateBlogRequest {
  id: string;
  isActive: boolean;
}