import { apiClient } from '../../core/api/apiClient';
import type { ApiResponse, NoData, PaginationRequest, PagedResponse } from '../../core/types/ApiResponse';
import type {
  RoleResponseDto,
  CreateRoleRequest,
  UpdateRoleRequest,
} from './roleTypes';

const API_URL = '/roles';

const getAll = async (pagination: PaginationRequest): Promise<ApiResponse<PagedResponse<RoleResponseDto>>> => {
  const queryParams = new URLSearchParams({
    pageNumber: pagination.pageNumber.toString(),
    pageSize: pagination.pageSize.toString(),
  });

  return await apiClient<PagedResponse<RoleResponseDto>>(`${API_URL}?${queryParams}`);
};

const getById = async (id: number): Promise<ApiResponse<RoleResponseDto>> => {
  return await apiClient<RoleResponseDto>(`${API_URL}/${id}`);
};

const add = async (request: CreateRoleRequest): Promise<ApiResponse<RoleResponseDto>> => {
  return await apiClient<RoleResponseDto>(API_URL, {
    method: 'POST',
    body: JSON.stringify(request),
  });
};

const update = async (request: UpdateRoleRequest): Promise<ApiResponse<NoData>> => {
  return await apiClient<NoData>(API_URL, {
    method: 'PUT',
    body: JSON.stringify(request),
  });
};

const remove = async (id: number): Promise<ApiResponse<NoData>> => {
  return await apiClient<NoData>(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
};

const roleService = {
  getAll,
  getById,
  add,
  update,
  remove
};

export default roleService;