import { apiClient } from '../../core/api/apiClient'
import type {
  ApiResponse,
  NoData,
  PaginationRequest,
  PagedResponse,
} from '../../core/types/ApiResponse'
import type {
  InjuryResponseDto,
  CreatedInjuryResponseDto,
  CreateInjuryRequest,
  UpdateInjuryRequest,
  InjuryAdminListQuery,
} from './injuryTypes'

const API_URL = '/injuries'

const getAll = async (
  pagination: PaginationRequest,
  playerId?: number,
): Promise<ApiResponse<PagedResponse<InjuryResponseDto>>> => {
  const queryParams = new URLSearchParams({
    pageNumber: pagination.pageNumber.toString(),
    pageSize: pagination.pageSize.toString(),
  })

  if (playerId != null) {
    queryParams.append('playerId', playerId.toString())
  }

  return await apiClient<PagedResponse<InjuryResponseDto>>(`${API_URL}?${queryParams}`)
}

const getAllForAdmin = async (
  query: InjuryAdminListQuery = {},
): Promise<ApiResponse<PagedResponse<InjuryResponseDto>>> => {
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

  return await apiClient<PagedResponse<InjuryResponseDto>>(
    `${API_URL}/manage?${queryParams}`,
  )
}

const getById = async (id: number): Promise<ApiResponse<InjuryResponseDto>> => {
  return await apiClient<InjuryResponseDto>(`${API_URL}/${id}`)
}

const add = async (
  request: CreateInjuryRequest,
): Promise<ApiResponse<CreatedInjuryResponseDto>> => {
  return await apiClient<CreatedInjuryResponseDto>(API_URL, {
    method: 'POST',
    body: JSON.stringify(request),
  })
}

const update = async (request: UpdateInjuryRequest): Promise<ApiResponse<NoData>> => {
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

const injuryService = {
  getAll,
  getAllForAdmin,
  getById,
  add,
  update,
  remove,
}

export default injuryService
