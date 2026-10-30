import { apiClient } from '../../core/api/apiClient'
import type {
  ApiResponse,
  NoData,
  PaginationRequest,
  PagedResponse,
  CursorPagedResponse,
} from '../../core/types/ApiResponse'
import type {
  PlayerStatsResponseDto,
  CreatedPlayerStatsResponseDto,
  CreatePlayerStatsRequest,
  UpdatePlayerStatsRequest,
  PlayerStatsAdminListQuery,
} from './playerStatsTypes'

const API_URL = '/player-stats'

const getAll = async (
  pagination: PaginationRequest,
): Promise<ApiResponse<PagedResponse<PlayerStatsResponseDto>>> => {
  const queryParams = new URLSearchParams({
    pageNumber: pagination.pageNumber.toString(),
    pageSize: pagination.pageSize.toString(),
  })
  return await apiClient<PagedResponse<PlayerStatsResponseDto>>(`${API_URL}?${queryParams}`)
}

const getAllForAdmin = async (
  query: PlayerStatsAdminListQuery = {},
): Promise<ApiResponse<PagedResponse<PlayerStatsResponseDto>>> => {
  const queryParams = new URLSearchParams()

  queryParams.set('pageNumber', String(query.pageNumber ?? 1))
  queryParams.set('pageSize', String(query.pageSize ?? 10))

  if (query.search?.trim()) {
    queryParams.set('search', query.search.trim())
  }

  if (query.seasonId != null) {
    queryParams.set('seasonId', String(query.seasonId))
  }

  if (query.playerId != null) {
    queryParams.set('playerId', String(query.playerId))
  }

  if (query.team?.trim()) {
    queryParams.set('team', query.team.trim())
  }

  if (query.positionGroup && query.positionGroup !== 'all') {
    queryParams.set('positionGroup', query.positionGroup)
  }

  if (query.sort) {
    queryParams.set('sort', query.sort)
  }

  return await apiClient<PagedResponse<PlayerStatsResponseDto>>(
    `${API_URL}/manage?${queryParams}`,
  )
}

const getById = async (id: number): Promise<ApiResponse<PlayerStatsResponseDto>> => {
  return await apiClient<PlayerStatsResponseDto>(`${API_URL}/${id}`)
}

const getByPlayer = async (
  playerId: number,
): Promise<ApiResponse<PagedResponse<PlayerStatsResponseDto>>> => {
  return await apiClient<PagedResponse<PlayerStatsResponseDto>>(
    `${API_URL}/by-player/${playerId}`,
  )
}

const getTopScorers = async (
  count: number,
  lastValue?: number,
  lastId?: number,
): Promise<ApiResponse<CursorPagedResponse<PlayerStatsResponseDto>>> => {
  const queryParams = new URLSearchParams()

  if (lastValue) {
    queryParams.append('lastValue', lastValue.toString())
  }

  if (lastId) {
    queryParams.append('lastId', lastId.toString())
  }

  const qs = queryParams.toString() ? `?${queryParams.toString()}` : ''
  return await apiClient<CursorPagedResponse<PlayerStatsResponseDto>>(
    `${API_URL}/top-scorers/${count}${qs}`,
  )
}

const getTopAssisters = async (
  count: number,
  lastValue?: number,
  lastId?: number,
): Promise<ApiResponse<CursorPagedResponse<PlayerStatsResponseDto>>> => {
  const queryParams = new URLSearchParams()

  if (lastValue) {
    queryParams.append('lastValue', lastValue.toString())
  }

  if (lastId) {
    queryParams.append('lastId', lastId.toString())
  }

  const qs = queryParams.toString() ? `?${queryParams.toString()}` : ''
  return await apiClient<CursorPagedResponse<PlayerStatsResponseDto>>(
    `${API_URL}/top-assisters/${count}${qs}`,
  )
}

const add = async (
  request: CreatePlayerStatsRequest,
): Promise<ApiResponse<CreatedPlayerStatsResponseDto>> => {
  return await apiClient<CreatedPlayerStatsResponseDto>(API_URL, {
    method: 'POST',
    body: JSON.stringify(request),
  })
}

const update = async (request: UpdatePlayerStatsRequest): Promise<ApiResponse<NoData>> => {
  return await apiClient<NoData>(API_URL, {
    method: 'PUT',
    body: JSON.stringify(request),
  })
}

const remove = async (id: number): Promise<ApiResponse<NoData>> => {
  return await apiClient<NoData>(`${API_URL}/${id}`, {
    method: 'DELETE',
  })
}

const playerStatsService = {
  getAll,
  getAllForAdmin,
  getById,
  getByPlayer,
  getTopScorers,
  getTopAssisters,
  add,
  update,
  remove,
}

export default playerStatsService
