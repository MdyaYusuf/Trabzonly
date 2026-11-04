import { apiClient } from '../../core/api/apiClient'
import type {
  ApiResponse,
  NoData,
  PaginationRequest,
  PagedResponse,
} from '../../core/types/ApiResponse'
import type {
  CreateRoleRequest,
  RoleAdminListItemDto,
  RoleAdminListQuery,
  RoleAdminSummaryDto,
  RoleResponseDto,
  UpdateRoleRequest,
} from './roleTypes'

const API_URL = '/roles'

const getAll = async (
  pagination: PaginationRequest,
): Promise<ApiResponse<PagedResponse<RoleResponseDto>>> => {
  const queryParams = new URLSearchParams({
    pageNumber: pagination.pageNumber.toString(),
    pageSize: pagination.pageSize.toString(),
  })

  return await apiClient<PagedResponse<RoleResponseDto>>(`${API_URL}?${queryParams}`)
}

const getAllForAdmin = async (
  query: RoleAdminListQuery = {},
): Promise<ApiResponse<RoleAdminListItemDto[]>> => {
  const queryParams = new URLSearchParams()

  if (query.search?.trim()) {
    queryParams.set('search', query.search.trim())
  }

  if (query.isSystem !== undefined) {
    queryParams.set('isSystem', String(query.isSystem))
  }

  if (query.sort) {
    queryParams.set('sort', query.sort)
  }

  const queryString = queryParams.toString()

  return await apiClient<RoleAdminListItemDto[]>(
    queryString ? `${API_URL}/manage?${queryString}` : `${API_URL}/manage`,
  )
}

const getAdminSummary = async (): Promise<ApiResponse<RoleAdminSummaryDto>> => {
  return await apiClient<RoleAdminSummaryDto>(`${API_URL}/manage/summary`)
}

const getById = async (id: number): Promise<ApiResponse<RoleResponseDto>> => {
  return await apiClient<RoleResponseDto>(`${API_URL}/${id}`)
}

const add = async (request: CreateRoleRequest): Promise<ApiResponse<RoleResponseDto>> => {
  return await apiClient<RoleResponseDto>(API_URL, {
    method: 'POST',
    body: JSON.stringify(request),
  })
}

const update = async (request: UpdateRoleRequest): Promise<ApiResponse<NoData>> => {
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

const roleService = {
  getAll,
  getAllForAdmin,
  getAdminSummary,
  getById,
  add,
  update,
  remove,
}

export default roleService
