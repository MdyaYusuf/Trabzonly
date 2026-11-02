import { apiClient } from '../../core/api/apiClient'
import type {
  ApiResponse,
  NoData,
  PaginationRequest,
  PagedResponse,
} from '../../core/types/ApiResponse'
import type {
  PositionResponseDto,
  CreatePositionRequest,
  UpdatePositionRequest,
  PositionAdminListQuery,
} from './positionTypes'

const API_URL = '/positions'

const getAll = async (
  pagination: PaginationRequest,
): Promise<ApiResponse<PagedResponse<PositionResponseDto>>> => {
  const queryParams = new URLSearchParams({
    pageNumber: pagination.pageNumber.toString(),
    pageSize: pagination.pageSize.toString(),
  })
  return await apiClient<PagedResponse<PositionResponseDto>>(`${API_URL}?${queryParams}`)
}

const getAllForAdmin = async (
  query: PositionAdminListQuery = {},
): Promise<ApiResponse<PositionResponseDto[]>> => {
  const queryParams = new URLSearchParams()

  if (query.search?.trim()) {
    queryParams.set('search', query.search.trim())
  }

  if (query.zone !== undefined) {
    queryParams.set('zone', String(query.zone))
  }

  if (query.sort) {
    queryParams.set('sort', query.sort)
  }

  const queryString = queryParams.toString()

  return await apiClient<PositionResponseDto[]>(
    queryString ? `${API_URL}/manage?${queryString}` : `${API_URL}/manage`,
  )
}

const getById = async (id: number): Promise<ApiResponse<PositionResponseDto>> => {
  return await apiClient<PositionResponseDto>(`${API_URL}/${id}`)
}

const add = async (
  request: CreatePositionRequest,
): Promise<ApiResponse<PositionResponseDto>> => {
  return await apiClient<PositionResponseDto>(API_URL, {
    method: 'POST',
    body: JSON.stringify(request),
  })
}

const update = async (request: UpdatePositionRequest): Promise<ApiResponse<NoData>> => {
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

const positionService = {
  getAll,
  getAllForAdmin,
  getById,
  add,
  update,
  remove,
}

export default positionService
