import { apiClient } from '../../core/api/apiClient'
import type { ApiResponse, NoData, PagedResponse } from '../../core/types/ApiResponse'
import type {
  CreatePollRequest,
  PollAdminDetailDto,
  PollAdminListItemDto,
  PollAdminListQuery,
  PollResponseDto,
  UpdatePollRequest,
  VotePollRequest,
} from './pollTypes'

const API_URL = '/polls'

const getActiveByPlayer = async (
  playerId: number,
): Promise<ApiResponse<PollResponseDto | null>> => {
  return await apiClient<PollResponseDto | null>(`${API_URL}/active/by-player/${playerId}`)
}

const getActiveByPost = async (
  postId: string,
): Promise<ApiResponse<PollResponseDto | null>> => {
  return await apiClient<PollResponseDto | null>(`${API_URL}/active/by-post/${postId}`)
}

const getActiveGlobal = async (): Promise<ApiResponse<PollResponseDto | null>> => {
  return await apiClient<PollResponseDto | null>(`${API_URL}/active/global`)
}

const getAllForAdmin = async (
  query: PollAdminListQuery = {},
): Promise<ApiResponse<PagedResponse<PollAdminListItemDto>>> => {
  const queryParams = new URLSearchParams()

  queryParams.set('pageNumber', String(query.pageNumber ?? 1))
  queryParams.set('pageSize', String(query.pageSize ?? 10))

  if (query.search?.trim()) {
    queryParams.set('search', query.search.trim())
  }

  if (query.isActive !== undefined) {
    queryParams.set('isActive', String(query.isActive))
  }

  if (query.scope) {
    queryParams.set('scope', query.scope)
  }

  if (query.sort) {
    queryParams.set('sort', query.sort)
  }

  return await apiClient<PagedResponse<PollAdminListItemDto>>(
    `${API_URL}/manage?${queryParams}`,
  )
}

const getAdminById = async (id: number): Promise<ApiResponse<PollAdminDetailDto>> => {
  return await apiClient<PollAdminDetailDto>(`${API_URL}/manage/${id}`)
}

const add = async (request: CreatePollRequest): Promise<ApiResponse<{ id: number }>> => {
  return await apiClient<{ id: number }>(API_URL, {
    method: 'POST',
    body: JSON.stringify(request),
  })
}

const update = async (request: UpdatePollRequest): Promise<ApiResponse<NoData>> => {
  return await apiClient<NoData>(API_URL, {
    method: 'PUT',
    body: JSON.stringify(request),
  })
}

const deactivate = async (id: number): Promise<ApiResponse<NoData>> => {
  return await apiClient<NoData>(`${API_URL}/${id}`, {
    method: 'DELETE',
  })
}

const vote = async (
  pollId: number,
  request: VotePollRequest,
): Promise<ApiResponse<PollResponseDto>> => {
  return await apiClient<PollResponseDto>(`${API_URL}/${pollId}/vote`, {
    method: 'POST',
    body: JSON.stringify(request),
  })
}

const pollService = {
  getActiveByPlayer,
  getActiveByPost,
  getActiveGlobal,
  getAllForAdmin,
  getAdminById,
  add,
  update,
  deactivate,
  vote,
}

export default pollService
