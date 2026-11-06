import { apiClient } from '../../core/api/apiClient'
import type {
  ApiResponse,
  NoData,
  PaginationRequest,
  PagedResponse,
} from '../../core/types/ApiResponse'
import type {
  CategoryAdminListItemDto,
  CategoryAdminListQuery,
  CategoryResponseDto,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from './categoryTypes'

const API_URL = '/categories'

const getAll = async (
  pagination: PaginationRequest,
): Promise<ApiResponse<PagedResponse<CategoryResponseDto>>> => {
  const queryParams = new URLSearchParams({
    pageNumber: pagination.pageNumber.toString(),
    pageSize: pagination.pageSize.toString(),
  })
  return await apiClient<PagedResponse<CategoryResponseDto>>(`${API_URL}?${queryParams}`)
}

const getAllForAdmin = async (
  query: CategoryAdminListQuery = {},
): Promise<ApiResponse<CategoryAdminListItemDto[]>> => {
  const queryParams = new URLSearchParams()

  if (query.search?.trim()) {
    queryParams.set('search', query.search.trim())
  }

  if (query.isActive !== undefined) {
    queryParams.set('isActive', String(query.isActive))
  }

  if (query.sort) {
    queryParams.set('sort', query.sort)
  }

  const queryString = queryParams.toString()

  return await apiClient<CategoryAdminListItemDto[]>(
    queryString ? `${API_URL}/manage?${queryString}` : `${API_URL}/manage`,
  )
}

const getById = async (id: number): Promise<ApiResponse<CategoryResponseDto>> => {
  return await apiClient<CategoryResponseDto>(`${API_URL}/${id}`)
}

const add = async (
  request: CreateCategoryRequest,
): Promise<ApiResponse<CategoryResponseDto>> => {
  return await apiClient<CategoryResponseDto>(API_URL, {
    method: 'POST',
    body: JSON.stringify(request),
  })
}

const update = async (request: UpdateCategoryRequest): Promise<ApiResponse<NoData>> => {
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

const categoryService = {
  getAll,
  getAllForAdmin,
  getById,
  add,
  update,
  remove,
}

export default categoryService
