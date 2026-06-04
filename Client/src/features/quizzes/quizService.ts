import { apiClient } from '../../core/api/apiClient';
import type { ApiResponse, NoData, CursorPagedResponse } from '../../core/types/ApiResponse';
import type {
  QuizResponseDto,
  CreatedQuizResponseDto,
  CreateQuizRequest,
  UpdateQuizRequest,
  SubmitQuizRequest,
  UserQuizResultResponseDto,
} from './quizTypes';

const API_URL = '/quizzes';

const getAll = async (): Promise<ApiResponse<QuizResponseDto[]>> => {
  return await apiClient<QuizResponseDto[]>(API_URL);
};

const getById = async (id: string): Promise<ApiResponse<QuizResponseDto>> => {
  return await apiClient<QuizResponseDto>(`${API_URL}/${id}`);
};

const getMostTaken = async (count: number): Promise<ApiResponse<QuizResponseDto[]>> => {
  return await apiClient<QuizResponseDto[]>(`${API_URL}/most-taken/${count}`);
};

const getRecent = async (
  count: number,
  lastDate?: string,
  lastId?: string
): Promise<ApiResponse<CursorPagedResponse<QuizResponseDto>>> => {
  const queryParams = new URLSearchParams();

  if (lastDate) {
    queryParams.append('lastDate', lastDate);
  }

  if (lastId) {
    queryParams.append('lastId', lastId);
  }

  const qs = queryParams.toString() ? `?${queryParams.toString()}` : '';
  return await apiClient<CursorPagedResponse<QuizResponseDto>>(`${API_URL}/recent/${count}${qs}`);
};

const add = async (request: CreateQuizRequest): Promise<ApiResponse<CreatedQuizResponseDto>> => {
  return await apiClient<CreatedQuizResponseDto>(API_URL, {
    method: 'POST',
    body: JSON.stringify(request),
  });
};

const update = async (request: UpdateQuizRequest): Promise<ApiResponse<NoData>> => {
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

const submit = async (request: SubmitQuizRequest): Promise<ApiResponse<UserQuizResultResponseDto>> => {
  return await apiClient<UserQuizResultResponseDto>(`${API_URL}/submit`, {
    method: 'POST',
    body: JSON.stringify(request),
  });
};

const quizService = {
  getAll,
  getById,
  getMostTaken,
  getRecent,
  add,
  update,
  remove,
  submit,
};

export default quizService;