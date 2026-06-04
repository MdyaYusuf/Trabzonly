import { apiClient } from '../../core/api/apiClient';
import type { ApiResponse, NoData, PaginationRequest, PagedResponse, CursorPagedResponse } from '../../core/types/ApiResponse';
import type {
  PlayerResponseDto,
  CreatedPlayerResponseDto,
  CreatePlayerRequest,
  UpdatePlayerRequest,
} from './playerTypes';

const API_URL = '/players';

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

const getAll = async (pagination: PaginationRequest): Promise<ApiResponse<PagedResponse<PlayerResponseDto>>> => {
  const queryParams = new URLSearchParams({
    pageNumber: pagination.pageNumber.toString(),
    pageSize: pagination.pageSize.toString(),
  });
  return await apiClient<PagedResponse<PlayerResponseDto>>(`${API_URL}?${queryParams}`);
};

const getById = async (id: string): Promise<ApiResponse<PlayerResponseDto>> => {
  return await apiClient<PlayerResponseDto>(`${API_URL}/${id}`);
};

const getTopValued = async (count: number, lastValue?: number, lastId?: string): Promise<ApiResponse<CursorPagedResponse<PlayerResponseDto>>> => {
  const queryParams = new URLSearchParams();

  if (lastValue) {
    queryParams.append('lastValue', lastValue.toString());
  }

  if (lastId) {
    queryParams.append('lastId', lastId);
  }

  const qs = queryParams.toString() ? `?${queryParams.toString()}` : '';

  return await apiClient<CursorPagedResponse<PlayerResponseDto>>(`${API_URL}/top-valued/${count}${qs}`);
};

const getMostCommented = async (count: number): Promise<ApiResponse<PlayerResponseDto[]>> => {
  return await apiClient<PlayerResponseDto[]>(`${API_URL}/most-commented/${count}`);
};

const add = async (request: CreatePlayerRequest): Promise<ApiResponse<CreatedPlayerResponseDto>> => {
  const formData = objectToFormData(request);
  return await apiClient<CreatedPlayerResponseDto>(API_URL, {
    method: 'POST',
    body: formData,
  });
};

const update = async (request: UpdatePlayerRequest): Promise<ApiResponse<NoData>> => {
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

const playerService = {
  getAll,
  getById,
  getTopValued,
  getMostCommented,
  add,
  update,
  remove
};

export default playerService;