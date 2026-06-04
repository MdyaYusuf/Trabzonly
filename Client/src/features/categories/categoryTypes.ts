// Responses
export interface CategoryResponseDto {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
}

// Requests
export interface CreateCategoryRequest {
  name: string;
  description?: string;
}

export interface UpdateCategoryRequest {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
}