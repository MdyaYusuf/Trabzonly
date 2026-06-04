import { apiClient } from '../../core/api/apiClient';
import type { ApiResponse, NoData, PaginationRequest, PagedResponse, CursorPagedResponse } from '../../core/types/ApiResponse';
import type {
  CommentResponseDto,
  CreatedCommentResponseDto,
  CreateCommentRequest,
  UpdateCommentRequest,
} from './commentTypes';

const API_URL = '/comments';

const getAll = async (pagination: PaginationRequest): Promise<ApiResponse<PagedResponse<CommentResponseDto>>> => {
  const queryParams = new URLSearchParams({
    pageNumber: pagination.pageNumber.toString(),
    pageSize: pagination.pageSize.toString(),
  });
  return await apiClient<PagedResponse<CommentResponseDto>>(`${API_URL}?${queryParams}`);
};

const getRecent = async (
  count: number = 10,
  blogId?: string,
  playerId?: string,
  lastDate?: string,
  lastId?: string
): Promise<ApiResponse<CursorPagedResponse<CommentResponseDto>>> => {
  const queryParams = new URLSearchParams();
  queryParams.append('count', count.toString());

  if (blogId) {
    queryParams.append('blogId', blogId);
  }
  if (playerId) {
    queryParams.append('playerId', playerId);
  }
  if (lastDate) {
    queryParams.append('lastDate', lastDate);
  }
  if (lastId) {
    queryParams.append('lastId', lastId);
  }

  const qs = queryParams.toString() ? `?${queryParams.toString()}` : '';
  return await apiClient<CursorPagedResponse<CommentResponseDto>>(`${API_URL}/recent${qs}`);
};

const getById = async (id: string): Promise<ApiResponse<CommentResponseDto>> => {
  return await apiClient<CommentResponseDto>(`${API_URL}/${id}`);
};

const add = async (request: CreateCommentRequest): Promise<ApiResponse<CreatedCommentResponseDto>> => {
  return await apiClient<CreatedCommentResponseDto>(API_URL, {
    method: 'POST',
    body: JSON.stringify(request),
  });
};

const update = async (request: UpdateCommentRequest): Promise<ApiResponse<NoData>> => {
  return await apiClient<NoData>(API_URL, {
    method: 'PUT',
    body: JSON.stringify(request),
  });
};

const remove = async (id: string): Promise<ApiResponse<NoData>> => {
  return await apiClient<NoData>(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
};

const commentService = { getAll, getRecent, getById, add, update, remove };

export default commentService;