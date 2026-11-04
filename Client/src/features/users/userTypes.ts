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
  updatedDate?: string | null
  roleId: number
  roleName: string
  followerCount?: number
  followingCount?: number
  isFollowedByCurrentUser?: boolean | null
}

export interface UserAdminListItemDto {
  id: string
  username: string
  email: string
  profileImageUrl?: string | null
  isActive: boolean
  createdDate: string
  roleId: number
  roleName: string
  postCount: number
  squadCount: number
}

export interface UserAdminDetailDto {
  id: string
  username: string
  email: string
  bio?: string | null
  displayTag?: string | null
  profileImageUrl?: string | null
  isActive: boolean
  createdDate: string
  updatedDate?: string | null
  roleId: number
  roleName: string
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

export interface PublicUserProfileDto {
  id: string
  username: string
  bio?: string | null
  displayTag?: string | null
  profileImageUrl?: string | null
  createdDate: string
  followerCount: number
  followingCount: number
  isFollowedByCurrentUser?: boolean | null
  postCount: number
  squadCount: number
  quizAttemptCount: number
  quizAveragePercent?: number | null
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

export type UserAdminSortOption = 'created-desc' | 'name-asc'

export interface UserAdminListQuery {
  pageNumber?: number
  pageSize?: number
  search?: string
  roleId?: number
  isActive?: boolean
  sort?: UserAdminSortOption
}

// Requests
export interface UpdateUserRequest {
  bio?: string | null
  displayTag?: string | null
  imageFile?: File | null
}

export interface AdminUpdateUserRequest {
  username: string
  bio?: string | null
  displayTag: string
  roleId: number
  isActive: boolean
  clearProfileImage?: boolean
}

export interface AdminSetUserActiveRequest {
  isActive: boolean
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}
