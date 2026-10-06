import { apiClient } from '../../core/api/apiClient'
import type { ApiResponse, NoData, PagedResponse, CursorPagedResponse } from '../../core/types/ApiResponse'
import type {
  SquadResponseDto,
  SquadPreviewDto,
  CreatedSquadResponseDto,
  CreateSquadRequest,
  UpdateSquadRequest,
  RateSquadRequest,
  SquadRatingResponseDto,
  SquadListQuery,
} from './squadTypes'

const API_URL = '/squads'

const getAll = async (
  query: SquadListQuery,
): Promise<ApiResponse<PagedResponse<SquadPreviewDto>>> => {
  const queryParams = new URLSearchParams({
    pageNumber: query.pageNumber.toString(),
    pageSize: query.pageSize.toString(),
    sort: query.sort ?? 'newest',
  })

  if (query.search && query.search.trim().length > 0) {
    queryParams.append('search', query.search.trim())
  }

  return await apiClient<PagedResponse<SquadPreviewDto>>(`${API_URL}?${queryParams}`)
}

const getById = async (id: string): Promise<ApiResponse<SquadResponseDto>> => {
  return await apiClient<SquadResponseDto>(`${API_URL}/${id}`)
}

const getRecent = async (
  count: number,
  lastDate?: string,
  lastId?: string,
): Promise<ApiResponse<CursorPagedResponse<SquadPreviewDto>>> => {
  const queryParams = new URLSearchParams()

  if (lastDate) {
    queryParams.append('lastDate', lastDate)
  }

  if (lastId) {
    queryParams.append('lastId', lastId)
  }

  const qs = queryParams.toString() ? `?${queryParams.toString()}` : ''

  return await apiClient<CursorPagedResponse<SquadPreviewDto>>(`${API_URL}/recent/${count}${qs}`)
}

const getTopRated = async (count: number): Promise<ApiResponse<SquadPreviewDto[]>> => {
  return await apiClient<SquadPreviewDto[]>(`${API_URL}/top-rated/${count}`)
}

const getByUserId = async (userId: string): Promise<ApiResponse<SquadPreviewDto[]>> => {
  return await apiClient<SquadPreviewDto[]>(`${API_URL}/user/${userId}`)
}

const add = async (request: CreateSquadRequest): Promise<ApiResponse<CreatedSquadResponseDto>> => {
  return await apiClient<CreatedSquadResponseDto>(API_URL, {
    method: 'POST',
    body: JSON.stringify(request),
  })
}

const update = async (request: UpdateSquadRequest): Promise<ApiResponse<NoData>> => {
  return await apiClient<NoData>(API_URL, {
    method: 'PUT',
    body: JSON.stringify(request),
  })
}

const remove = async (id: string): Promise<ApiResponse<NoData>> => {
  return await apiClient<NoData>(`${API_URL}/${id}`, {
    method: 'DELETE',
  })
}

const rate = async (
  id: string,
  request: RateSquadRequest,
): Promise<ApiResponse<SquadRatingResponseDto>> => {
  return await apiClient<SquadRatingResponseDto>(`${API_URL}/${id}/rate`, {
    method: 'POST',
    body: JSON.stringify(request),
  })
}

const squadService = {
  getAll,
  getById,
  getRecent,
  getTopRated,
  getByUserId,
  add,
  update,
  remove,
  rate,
}

export default squadService
