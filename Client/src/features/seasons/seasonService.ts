import { apiClient } from '../../core/api/apiClient';
import type { ApiResponse, NoData, PaginationRequest, PagedResponse } from '../../core/types/ApiResponse';
import type {
  SeasonResponseDto,
  CreateSeasonRequest,
  UpdateSeasonRequest,
} from './seasonTypes';

const API_URL = '/seasons';

const getAll = async (pagination: PaginationRequest): Promise<ApiResponse<PagedResponse<SeasonResponseDto>>> => {
  const queryParams = new URLSearchParams({
    pageNumber: pagination.pageNumber.toString(),
    pageSize: pagination.pageSize.toString(),
  });
  return await apiClient<PagedResponse<SeasonResponseDto>>(`${API_URL}?${queryParams}`);
};

const getById = async (id: string): Promise<ApiResponse<SeasonResponseDto>> => {
  return await apiClient<SeasonResponseDto>(`${API_URL}/${id}`);
};

const add = async (request: CreateSeasonRequest): Promise<ApiResponse<SeasonResponseDto>> => {
  return await apiClient<SeasonResponseDto>(API_URL, {
    method: 'POST',
    body: JSON.stringify(request),
  });
};

const update = async (request: UpdateSeasonRequest): Promise<ApiResponse<NoData>> => {
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

const seasonService = {
  getAll,
  getById,
  add,
  update,
  remove
};

export default seasonService;