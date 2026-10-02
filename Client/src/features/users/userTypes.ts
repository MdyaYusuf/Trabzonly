// Responses
export interface UserResponseDto {
  id: string // Guid maps to string
  username: string
  email: string
  bio?: string | null
  displayTag?: string | null
  profileImageUrl?: string | null
  isActive: boolean
  createdDate: string
  roleId: number
  roleName: string
  followerCount?: number
  followingCount?: number
  isFollowedByCurrentUser?: boolean | null
}

export interface UserPreviewDto {
  id: string
  username: string
  profileImageUrl?: string | null
  roleName: string
  postCount: number
  totalLikeCount: number
  followerCount?: number
  followingCount?: number
  createdDate: string
}

export interface CreatedUserResponseDto {
  id: string
  username: string
}

export interface UserFollowResponseDto {
  userId: string
  followerCount: number
  isFollowedByCurrentUser: boolean
}

// Requests
export interface UpdateUserRequest {
  username: string
  bio?: string | null
  displayTag?: string | null
  imageFile?: File | null
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}
