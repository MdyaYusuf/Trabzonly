import { apiClient } from '../../core/api/apiClient'
import type {
  ApiResponse,
  NoData,
  PaginationRequest,
  PagedResponse,
} from '../../core/types/ApiResponse'
import type {
  SeasonResponseDto,
  CreateSeasonRequest,
  UpdateSeasonRequest,
  SeasonAdminListQuery,
  SeasonAdminSummaryDto,
} from './seasonTypes'

const API_URL = '/seasons'

const getAll = async (
  pagination: PaginationRequest,
): Promise<ApiResponse<PagedResponse<SeasonResponseDto>>> => {
  const queryParams = new URLSearchParams({
    pageNumber: pagination.pageNumber.toString(),
    pageSize: pagination.pageSize.toString(),
  })
  return await apiClient<PagedResponse<SeasonResponseDto>>(`${API_URL}?${queryParams}`)
}

const getAllForAdmin = async (
  query: SeasonAdminListQuery = {},
): Promise<ApiResponse<PagedResponse<SeasonResponseDto>>> => {
  const queryParams = new URLSearchParams()

  queryParams.set('pageNumber', String(query.pageNumber ?? 1))
  queryParams.set('pageSize', String(query.pageSize ?? 10))

  if (query.search?.trim()) {
    queryParams.set('search', query.search.trim())
  }

  if (query.isActive !== undefined) {
    queryParams.set('isActive', String(query.isActive))
  }

  if (query.sort) {
    queryParams.set('sort', query.sort)
  }

  return await apiClient<PagedResponse<SeasonResponseDto>>(
    `${API_URL}/manage?${queryParams}`,
  )
}

const getAdminSummary = async (): Promise<ApiResponse<SeasonAdminSummaryDto>> => {
  return await apiClient<SeasonAdminSummaryDto>(`${API_URL}/manage/summary`)
}

const getById = async (id: number): Promise<ApiResponse<SeasonResponseDto>> => {
  return await apiClient<SeasonResponseDto>(`${API_URL}/${id}`)
}

const add = async (
  request: CreateSeasonRequest,
): Promise<ApiResponse<SeasonResponseDto>> => {
  return await apiClient<SeasonResponseDto>(API_URL, {
    method: 'POST',
    body: JSON.stringify(request),
  })
}

const update = async (request: UpdateSeasonRequest): Promise<ApiResponse<NoData>> => {
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

const seasonService = {
  getAll,
  getAllForAdmin,
  getAdminSummary,
  getById,
  add,
  update,
  remove,
}

export default seasonService
