import { apiClient } from '../../core/api/apiClient';
import type { ApiResponse, NoData, PaginationRequest, PagedResponse, CursorPagedResponse } from '../../core/types/ApiResponse';
import type {
  PostResponseDto,
  CreatedPostResponseDto,
  CreatePostRequest,
  UpdatePostRequest,
} from './postTypes';

const API_URL = '/posts';

const objectToFormData = (obj: any): FormData => {
  const formData = new FormData();
  Object.entries(obj).forEach(([key, value]) => {

    if (value !== undefined && value !== null) {

      if (value instanceof File) {
        formData.append(key, value);
      } else if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else {
        formData.append(key, (value as any).toString());
      }
    }
  });
  return formData;
};

const getAll = async (pagination: PaginationRequest): Promise<ApiResponse<PagedResponse<PostResponseDto>>> => {
  const queryParams = new URLSearchParams({
    pageNumber: pagination.pageNumber.toString(),
    pageSize: pagination.pageSize.toString(),
  });
  return await apiClient<PagedResponse<PostResponseDto>>(`${API_URL}?${queryParams}`);
};

const getById = async (id: string): Promise<ApiResponse<PostResponseDto>> => {
  return await apiClient<PostResponseDto>(`${API_URL}/${id}`);
};

const getTopCommented = async (count: number): Promise<ApiResponse<PostResponseDto[]>> => {
  return await apiClient<PostResponseDto[]>(`${API_URL}/top-commented/${count}`);
};

const getRecent = async (
  count: number,
  lastDate?: string,
  lastId?: string
): Promise<ApiResponse<CursorPagedResponse<PostResponseDto>>> => {
  const queryParams = new URLSearchParams();

  if (lastDate) {
    queryParams.append('lastDate', lastDate);
  }
  if (lastId) {
    queryParams.append('lastId', lastId);
  }

  const qs = queryParams.toString() ? `?${queryParams.toString()}` : '';
  return await apiClient<CursorPagedResponse<PostResponseDto>>(`${API_URL}/recent/${count}${qs}`);
};

const add = async (request: CreatePostRequest): Promise<ApiResponse<CreatedPostResponseDto>> => {
  const formData = objectToFormData(request);
  return await apiClient<CreatedPostResponseDto>(API_URL, {
    method: 'POST',
    body: formData,
  });
};

const update = async (request: UpdatePostRequest): Promise<ApiResponse<NoData>> => {
  const formData = objectToFormData(request);
  return await apiClient<NoData>(API_URL, {
    method: 'PUT',
    body: formData,
  });
};

const remove = async (id: string): Promise<ApiResponse<NoData>> => {
  return await apiClient<NoData>(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
};

const postService = { getAll, getById, getTopCommented, getRecent, add, update, remove };

export default postService;