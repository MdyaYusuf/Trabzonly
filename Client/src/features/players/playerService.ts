import { apiClient } from '../../core/api/apiClient'
import type {
  ApiResponse,
  NoData,
  PagedResponse,
  CursorPagedResponse,
} from '../../core/types/ApiResponse'
import type {
  PlayerResponseDto,
  PlayerRosterOverviewDto,
  CreatedPlayerResponseDto,
  CreatePlayerRequest,
  UpdatePlayerRequest,
  RatePlayerRequest,
  PlayerRatingResponseDto,
  PlayerListQuery,
} from './playerTypes'

const API_URL = '/players'

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
  query: PlayerListQuery = {},
): Promise<ApiResponse<PagedResponse<PlayerResponseDto>>> => {
  const queryParams = new URLSearchParams()

  queryParams.set('pageNumber', String(query.pageNumber ?? 1))
  queryParams.set('pageSize', String(query.pageSize ?? 12))

  if (query.search?.trim()) {
    queryParams.set('search', query.search.trim())
  }

  if (query.positionGroup && query.positionGroup !== 'all') {
    queryParams.set('positionGroup', query.positionGroup)
  }

  if (query.isDomestic !== undefined) {
    queryParams.set('isDomestic', String(query.isDomestic))
  }

  if (query.sort) {
    queryParams.set('sort', query.sort)
  }

  return await apiClient<PagedResponse<PlayerResponseDto>>(`${API_URL}?${queryParams}`)
}

const getRosterOverview = async (): Promise<ApiResponse<PlayerRosterOverviewDto>> => {
  return await apiClient<PlayerRosterOverviewDto>(`${API_URL}/roster-overview`)
}

const getById = async (id: string): Promise<ApiResponse<PlayerResponseDto>> => {
  return await apiClient<PlayerResponseDto>(`${API_URL}/${id}`)
}

const getTopValued = async (
  count: number,
  lastValue?: number,
  lastId?: string,
): Promise<ApiResponse<CursorPagedResponse<PlayerResponseDto>>> => {
  const queryParams = new URLSearchParams()

  if (lastValue) {
    queryParams.append('lastValue', lastValue.toString())
  }

  if (lastId) {
    queryParams.append('lastId', lastId)
  }

  const qs = queryParams.toString() ? `?${queryParams.toString()}` : ''

  return await apiClient<CursorPagedResponse<PlayerResponseDto>>(
    `${API_URL}/top-valued/${count}${qs}`,
  )
}

const getMostCommented = async (
  count: number,
): Promise<ApiResponse<PlayerResponseDto[]>> => {
  return await apiClient<PlayerResponseDto[]>(`${API_URL}/most-commented/${count}`)
}

const getTopRated = async (count: number): Promise<ApiResponse<PlayerResponseDto[]>> => {
  return await apiClient<PlayerResponseDto[]>(`${API_URL}/top-rated/${count}`)
}

const add = async (
  request: CreatePlayerRequest,
): Promise<ApiResponse<CreatedPlayerResponseDto>> => {
  const formData = objectToFormData(request as unknown as Record<string, unknown>)
  return await apiClient<CreatedPlayerResponseDto>(API_URL, {
    method: 'POST',
    body: formData,
  })
}

const update = async (request: UpdatePlayerRequest): Promise<ApiResponse<NoData>> => {
  const formData = objectToFormData(request as unknown as Record<string, unknown>)
  return await apiClient<NoData>(API_URL, {
    method: 'PUT',
    body: formData,
  })
}

const remove = async (id: string): Promise<ApiResponse<NoData>> => {
  return await apiClient<NoData>(`${API_URL}/${id}`, {
    method: 'DELETE',
  })
}

const rate = async (
  id: string,
  request: RatePlayerRequest,
): Promise<ApiResponse<PlayerRatingResponseDto>> => {
  return await apiClient<PlayerRatingResponseDto>(`${API_URL}/${id}/rate`, {
    method: 'POST',
    body: JSON.stringify(request),
  })
}

const playerService = {
  getAll,
  getRosterOverview,
  getById,
  getTopValued,
  getMostCommented,
  getTopRated,
  add,
  update,
  remove,
  rate,
}

export default playerService
