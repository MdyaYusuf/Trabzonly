import { apiClient } from '../../core/api/apiClient';
import type { ApiResponse, NoData, PagedResponse, CursorPagedResponse } from '../../core/types/ApiResponse';
import type {
  PostResponseDto,
  CreatedPostResponseDto,
  CreatePostRequest,
  UpdatePostRequest,
  PostReactionResponseDto,
  PostListQuery,
} from './postTypes';

const API_URL = '/posts';

const objectToFormData = (obj: Record<string, unknown>): FormData => {
  const formData = new FormData();
  Object.entries(obj).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    if (value instanceof File) {
      formData.append(key, value);
      return;
    }

    if (key === 'poll' && typeof value === 'object') {
      const poll = value as { question: string; options: string[] };
      formData.append('Poll.Question', poll.question);
      poll.options.forEach((option, index) => {
        formData.append(`Poll.Options[${index}]`, option);
      });
      return;
    }

    if (value instanceof Date) {
      formData.append(key, value.toISOString());
      return;
    }

    formData.append(key, String(value));
  });
  return formData;
};

const getAll = async (
  query: PostListQuery = {},
): Promise<ApiResponse<PagedResponse<PostResponseDto>>> => {
  const queryParams = new URLSearchParams();

  queryParams.set('pageNumber', String(query.pageNumber ?? 1));
  queryParams.set('pageSize', String(query.pageSize ?? 10));

  if (query.categoryId != null) {
    queryParams.set('categoryId', String(query.categoryId));
  }

  if (query.userId) {
    queryParams.set('userId', query.userId);
  }

  if (query.search?.trim()) {
    queryParams.set('search', query.search.trim());
  }

  if (query.sort) {
    queryParams.set('sort', query.sort);
  }

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
  const formData = objectToFormData(request as unknown as Record<string, unknown>);
  return await apiClient<CreatedPostResponseDto>(API_URL, {
    method: 'POST',
    body: formData,
  });
};

const update = async (request: UpdatePostRequest): Promise<ApiResponse<NoData>> => {
  const formData = objectToFormData(request as unknown as Record<string, unknown>);
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

const like = async (id: string): Promise<ApiResponse<PostReactionResponseDto>> => {
  return await apiClient<PostReactionResponseDto>(`${API_URL}/${id}/like`, {
    method: 'POST',
  });
};

const dislike = async (id: string): Promise<ApiResponse<PostReactionResponseDto>> => {
  return await apiClient<PostReactionResponseDto>(`${API_URL}/${id}/dislike`, {
    method: 'POST',
  });
};

const postService = { getAll, getById, getTopCommented, getRecent, add, update, remove, like, dislike };

export default postService;
