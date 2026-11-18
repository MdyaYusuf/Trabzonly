import { apiClient } from '../../core/api/apiClient'
import type { ApiResponse, NoData, PagedResponse } from '../../core/types/ApiResponse'
import type {
  ContactMessageAdminListItemDto,
  ContactMessageAdminListQuery,
  ContactMessageUnreadStatusDto,
  CreateContactMessageRequest,
  CreatedContactMessageResponseDto,
} from './contactMessageTypes'

const API_URL = '/contact-messages'

const create = async (
  request: CreateContactMessageRequest,
): Promise<ApiResponse<CreatedContactMessageResponseDto>> => {
  return await apiClient<CreatedContactMessageResponseDto>(API_URL, {
    method: 'POST',
    body: JSON.stringify(request),
  })
}

const getAllForAdmin = async (
  query: ContactMessageAdminListQuery = {},
): Promise<ApiResponse<PagedResponse<ContactMessageAdminListItemDto>>> => {
  const queryParams = new URLSearchParams()

  queryParams.set('pageNumber', String(query.pageNumber ?? 1))
  queryParams.set('pageSize', String(query.pageSize ?? 10))

  if (query.search?.trim()) {
    queryParams.set('search', query.search.trim())
  }

  if (query.isRead !== undefined) {
    queryParams.set('isRead', String(query.isRead))
  }

  if (query.isResolved !== undefined) {
    queryParams.set('isResolved', String(query.isResolved))
  }

  if (query.sort) {
    queryParams.set('sort', query.sort)
  }

  return await apiClient<PagedResponse<ContactMessageAdminListItemDto>>(
    `${API_URL}?${queryParams}`,
  )
}

const getHasUnread = async (): Promise<ApiResponse<ContactMessageUnreadStatusDto>> => {
  return await apiClient<ContactMessageUnreadStatusDto>(`${API_URL}/has-unread`)
}

const markAsRead = async (id: number): Promise<ApiResponse<NoData>> => {
  return await apiClient<NoData>(`${API_URL}/${id}/read`, {
    method: 'PATCH',
    silentSuccess: true,
  })
}

const setResolved = async (
  id: number,
  isResolved: boolean,
): Promise<ApiResponse<NoData>> => {
  return await apiClient<NoData>(`${API_URL}/${id}/resolved`, {
    method: 'PATCH',
    body: JSON.stringify({ isResolved }),
  })
}

const remove = async (id: number): Promise<ApiResponse<NoData>> => {
  return await apiClient<NoData>(`${API_URL}/${id}`, {
    method: 'DELETE',
  })
}

const contactMessageService = {
  create,
  getAllForAdmin,
  getHasUnread,
  markAsRead,
  setResolved,
  remove,
}

export default contactMessageService
