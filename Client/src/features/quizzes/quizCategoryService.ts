import { apiClient } from '../../core/api/apiClient'
import type { ApiResponse, NoData } from '../../core/types/ApiResponse'
import type {
  CreateQuizCategoryRequest,
  CreatedQuizCategoryResponseDto,
  QuizCategoryResponseDto,
  UpdateQuizCategoryRequest,
} from './quizTypes'

const API_URL = '/quiz-categories'

const getActive = async (): Promise<ApiResponse<QuizCategoryResponseDto[]>> => {
  return await apiClient<QuizCategoryResponseDto[]>(API_URL)
}

/** Admin-only list including inactive categories. */
const getAllForAdmin = async (): Promise<ApiResponse<QuizCategoryResponseDto[]>> => {
  return await apiClient<QuizCategoryResponseDto[]>(`${API_URL}/manage`)
}

const getById = async (id: number): Promise<ApiResponse<QuizCategoryResponseDto>> => {
  return await apiClient<QuizCategoryResponseDto>(`${API_URL}/${id}`)
}

const add = async (
  request: CreateQuizCategoryRequest,
): Promise<ApiResponse<CreatedQuizCategoryResponseDto>> => {
  return await apiClient<CreatedQuizCategoryResponseDto>(API_URL, {
    method: 'POST',
    body: JSON.stringify(request),
  })
}

const update = async (request: UpdateQuizCategoryRequest): Promise<ApiResponse<NoData>> => {
  return await apiClient<NoData>(API_URL, {
    method: 'PUT',
    body: JSON.stringify(request),
  })
}

const remove = async (id: number): Promise<ApiResponse<NoData>> => {
  return await apiClient<NoData>(`${API_URL}/${id}`, {
    method: 'DELETE',
  })
}

const quizCategoryService = {
  getActive,
  getAllForAdmin,
  getById,
  add,
  update,
  remove,
}

export default quizCategoryService
