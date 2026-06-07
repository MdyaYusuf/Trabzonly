// Responses
export interface UserResponseDto {
  id: string; // Guid maps to string
  username: string;
  bio?: string | null;
  profileImageUrl?: string | null;
  isActive: boolean;
  createdDate: string;
  roleId: number;
  roleName: string;
}

export interface UserPreviewDto {
  id: string;
  username: string;
  profileImageUrl?: string | null;
  roleName: string;
}

export interface CreatedUserResponseDto {
  id: string;
  username: string;
}

// Requests
export interface UpdateUserRequest {
  username: string;
  bio?: string | null;
  imageFile?: File | null;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}