import { apiClient } from '../../core/api/apiClient';
import type { ApiResponse, NoData, PaginationRequest, PagedResponse, CursorPagedResponse } from '../../core/types/ApiResponse';
import type {
  UserResponseDto,
  UserPreviewDto,
  UpdateUserRequest,
  ChangePasswordRequest,
} from './userTypes';

const API_URL = '/users';

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

const getAll = async (pagination: PaginationRequest): Promise<ApiResponse<PagedResponse<UserResponseDto>>> => {
  const queryParams = new URLSearchParams({
    pageNumber: pagination.pageNumber.toString(),
    pageSize: pagination.pageSize.toString(),
  });
  return await apiClient<PagedResponse<UserResponseDto>>(`${API_URL}?${queryParams}`);
};

const getById = async (id: string): Promise<ApiResponse<UserResponseDto>> => {
  return await apiClient<UserResponseDto>(`${API_URL}/${id}`);
};

const getTopContributors = async (count: number): Promise<ApiResponse<UserPreviewDto[]>> => {
  return await apiClient<UserPreviewDto[]>(`${API_URL}/top-contributors/${count}`);
};

const getNewestMembers = async (
  count: number,
  lastDate?: string,
  lastId?: string
): Promise<ApiResponse<CursorPagedResponse<UserPreviewDto>>> => {
  const queryParams = new URLSearchParams();

  if (lastDate) {
    queryParams.append('lastDate', lastDate);
  }

  if (lastId) {
    queryParams.append('lastId', lastId);
  }

  const qs = queryParams.toString() ? `?${queryParams.toString()}` : '';
  return await apiClient<CursorPagedResponse<UserPreviewDto>>(`${API_URL}/newest-members/${count}${qs}`);
};

const updateProfile = async (request: UpdateUserRequest): Promise<ApiResponse<NoData>> => {
  const formData = objectToFormData(request);
  return await apiClient<NoData>(`${API_URL}/profile`, {
    method: 'PUT',
    body: formData,
  });
};

const changePassword = async (request: ChangePasswordRequest): Promise<ApiResponse<NoData>> => {
  return await apiClient<NoData>(`${API_URL}/change-password`, {
    method: 'PUT',
    body: JSON.stringify(request),
  });
};

const remove = async (id: string): Promise<ApiResponse<NoData>> => {
  return await apiClient<NoData>(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
};

const userService = {
  getAll,
  getById,
  getTopContributors,
  getNewestMembers,
  updateProfile,
  changePassword,
  remove,
};

export default userService;