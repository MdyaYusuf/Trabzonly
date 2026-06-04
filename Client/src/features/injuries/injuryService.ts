import { apiClient } from '../../core/api/apiClient';
import type { ApiResponse, NoData, PaginationRequest, PagedResponse } from '../../core/types/ApiResponse';
import type {
  InjuryResponseDto,
  CreatedInjuryResponseDto,
  CreateInjuryRequest,
  UpdateInjuryRequest,
} from './injuryTypes';

const API_URL = '/injuries';

const getAll = async (pagination: PaginationRequest): Promise<ApiResponse<PagedResponse<InjuryResponseDto>>> => {
  const queryParams = new URLSearchParams({
    pageNumber: pagination.pageNumber.toString(),
    pageSize: pagination.pageSize.toString(),
  });
  return await apiClient<PagedResponse<InjuryResponseDto>>(`${API_URL}?${queryParams}`);
};

const getById = async (id: string): Promise<ApiResponse<InjuryResponseDto>> => {
  return await apiClient<InjuryResponseDto>(`${API_URL}/${id}`);
};

const add = async (request: CreateInjuryRequest): Promise<ApiResponse<CreatedInjuryResponseDto>> => {
  return await apiClient<CreatedInjuryResponseDto>(API_URL, {
    method: 'POST',
    body: JSON.stringify(request),
  });
};

const update = async (request: UpdateInjuryRequest): Promise<ApiResponse<NoData>> => {
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

const injuryService = {
  getAll,
  getById,
  add,
  update,
  remove
};

export default injuryService;