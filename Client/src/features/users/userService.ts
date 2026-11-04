import { apiClient } from '../../core/api/apiClient'
import type {
  ApiResponse,
  NoData,
  PaginationRequest,
  PagedResponse,
  CursorPagedResponse,
} from '../../core/types/ApiResponse'
import type {
  UserResponseDto,
  UserPreviewDto,
  PublicUserProfileDto,
  UpdateUserRequest,
  ChangePasswordRequest,
  UserFollowResponseDto,
  UserAdminListItemDto,
  UserAdminDetailDto,
  UserAdminListQuery,
  AdminUpdateUserRequest,
  AdminSetUserActiveRequest,
} from './userTypes'

const API_URL = '/users'

const objectToFormData = (obj: Record<string, unknown>): FormData => {
  const formData = new FormData()
  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (value instanceof File) {
        formData.append(key, value)
      } else if (value instanceof Date) {
        formData.append(key, value.toISOString())
      } else {
        formData.append(key, String(value))
      }
    }
  })

  return formData
}

const getAll = async (
  pagination: PaginationRequest,
): Promise<ApiResponse<PagedResponse<UserResponseDto>>> => {
  const queryParams = new URLSearchParams({
    pageNumber: pagination.pageNumber.toString(),
    pageSize: pagination.pageSize.toString(),
  })
  return await apiClient<PagedResponse<UserResponseDto>>(`${API_URL}?${queryParams}`)
}

const getAllForAdmin = async (
  query: UserAdminListQuery = {},
): Promise<ApiResponse<PagedResponse<UserAdminListItemDto>>> => {
  const queryParams = new URLSearchParams()

  queryParams.set('pageNumber', String(query.pageNumber ?? 1))
  queryParams.set('pageSize', String(query.pageSize ?? 10))

  if (query.search?.trim()) {
    queryParams.set('search', query.search.trim())
  }

  if (query.roleId != null) {
    queryParams.set('roleId', String(query.roleId))
  }

  if (query.isActive !== undefined) {
    queryParams.set('isActive', String(query.isActive))
  }

  if (query.sort) {
    queryParams.set('sort', query.sort)
  }

  return await apiClient<PagedResponse<UserAdminListItemDto>>(
    `${API_URL}/manage?${queryParams}`,
  )
}

const getAdminDetail = async (id: string): Promise<ApiResponse<UserAdminDetailDto>> => {
  return await apiClient<UserAdminDetailDto>(`${API_URL}/manage/${id}`)
}

const adminUpdate = async (
  id: string,
  request: AdminUpdateUserRequest,
): Promise<ApiResponse<NoData>> => {
  return await apiClient<NoData>(`${API_URL}/manage/${id}`, {
    method: 'PUT',
    body: JSON.stringify(request),
  })
}

const adminSetActive = async (
  id: string,
  request: AdminSetUserActiveRequest,
): Promise<ApiResponse<NoData>> => {
  return await apiClient<NoData>(`${API_URL}/manage/${id}/active`, {
    method: 'PUT',
    body: JSON.stringify(request),
  })
}

const getById = async (id: string): Promise<ApiResponse<UserResponseDto>> => {
  return await apiClient<UserResponseDto>(`${API_URL}/${id}`)
}

const getMe = async (): Promise<ApiResponse<UserResponseDto>> => {
  return await apiClient<UserResponseDto>(`${API_URL}/me`)
}

const getByUsername = async (
  username: string,
): Promise<ApiResponse<PublicUserProfileDto>> => {
  return await apiClient<PublicUserProfileDto>(
    `${API_URL}/by-username/${encodeURIComponent(username)}`,
  )
}

const getTopContributors = async (count: number): Promise<ApiResponse<UserPreviewDto[]>> => {
  return await apiClient<UserPreviewDto[]>(`${API_URL}/top-contributors/${count}`)
}

const getNewestMembers = async (
  count: number,
  lastDate?: string,
  lastId?: string,
): Promise<ApiResponse<CursorPagedResponse<UserPreviewDto>>> => {
  const queryParams = new URLSearchParams()

  if (lastDate) {
    queryParams.append('lastDate', lastDate)
  }

  if (lastId) {
    queryParams.append('lastId', lastId)
  }

  const qs = queryParams.toString() ? `?${queryParams.toString()}` : ''
  return await apiClient<CursorPagedResponse<UserPreviewDto>>(
    `${API_URL}/newest-members/${count}${qs}`,
  )
}

const updateProfile = async (request: UpdateUserRequest): Promise<ApiResponse<NoData>> => {
  const formData = objectToFormData(request as unknown as Record<string, unknown>)
  return await apiClient<NoData>(`${API_URL}/profile`, {
    method: 'PUT',
    body: formData,
  })
}

const changePassword = async (request: ChangePasswordRequest): Promise<ApiResponse<NoData>> => {
  return await apiClient<NoData>(`${API_URL}/change-password`, {
    method: 'PUT',
    body: JSON.stringify(request),
  })
}

const remove = async (id: string): Promise<ApiResponse<NoData>> => {
  return await apiClient<NoData>(`${API_URL}/${id}`, {
    method: 'DELETE',
  })
}

const follow = async (id: string): Promise<ApiResponse<UserFollowResponseDto>> => {
  return await apiClient<UserFollowResponseDto>(`${API_URL}/${id}/follow`, {
    method: 'POST',
  })
}

const unfollow = async (id: string): Promise<ApiResponse<UserFollowResponseDto>> => {
  return await apiClient<UserFollowResponseDto>(`${API_URL}/${id}/unfollow`, {
    method: 'DELETE',
  })
}

const userService = {
  getAll,
  getAllForAdmin,
  getAdminDetail,
  adminUpdate,
  adminSetActive,
  getById,
  getMe,
  getByUsername,
  getTopContributors,
  getNewestMembers,
  updateProfile,
  changePassword,
  remove,
  follow,
  unfollow,
}

export default userService
