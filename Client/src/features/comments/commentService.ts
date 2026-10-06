import { apiClient } from '../../core/api/apiClient'
import type {
  ApiResponse,
  NoData,
  PaginationRequest,
  PagedResponse,
  CursorPagedResponse,
} from '../../core/types/ApiResponse'
import type {
  CommentResponseDto,
  CreatedCommentResponseDto,
  CreateCommentRequest,
  UpdateCommentRequest,
  CommentReactionResponseDto,
  GetRecentCommentsQuery,
} from './commentTypes'

const API_URL = '/comments'

const getAll = async (
  pagination: PaginationRequest,
): Promise<ApiResponse<PagedResponse<CommentResponseDto>>> => {
  const queryParams = new URLSearchParams({
    pageNumber: pagination.pageNumber.toString(),
    pageSize: pagination.pageSize.toString(),
  })
  return await apiClient<PagedResponse<CommentResponseDto>>(`${API_URL}?${queryParams}`)
}

const getRecent = async (
  query: GetRecentCommentsQuery = {},
): Promise<ApiResponse<CursorPagedResponse<CommentResponseDto>>> => {
  const queryParams = new URLSearchParams()
  queryParams.append('count', (query.count ?? 10).toString())
  queryParams.append('sort', query.sort ?? 'newest')

  if (query.postId) {
    queryParams.append('postId', query.postId)
  }

  if (query.playerId != null) {
    queryParams.append('playerId', query.playerId.toString())
  }

  if (query.squadId) {
    queryParams.append('squadId', query.squadId)
  }

  if (query.lastDate) {
    queryParams.append('lastDate', query.lastDate)
  }

  if (query.lastId) {
    queryParams.append('lastId', query.lastId)
  }

  const qs = queryParams.toString() ? `?${queryParams.toString()}` : ''
  return await apiClient<CursorPagedResponse<CommentResponseDto>>(`${API_URL}/recent${qs}`)
}

const getById = async (id: string): Promise<ApiResponse<CommentResponseDto>> => {
  return await apiClient<CommentResponseDto>(`${API_URL}/${id}`)
}

const add = async (
  request: CreateCommentRequest,
): Promise<ApiResponse<CreatedCommentResponseDto>> => {
  return await apiClient<CreatedCommentResponseDto>(API_URL, {
    method: 'POST',
    body: JSON.stringify(request),
  })
}

const update = async (request: UpdateCommentRequest): Promise<ApiResponse<NoData>> => {
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

const like = async (id: string): Promise<ApiResponse<CommentReactionResponseDto>> => {
  return await apiClient<CommentReactionResponseDto>(`${API_URL}/${id}/like`, {
    method: 'POST',
  })
}

const dislike = async (id: string): Promise<ApiResponse<CommentReactionResponseDto>> => {
  return await apiClient<CommentReactionResponseDto>(`${API_URL}/${id}/dislike`, {
    method: 'POST',
  })
}

const commentService = {
  getAll,
  getRecent,
  getById,
  add,
  update,
  remove,
  like,
  dislike,
}

export default commentService
