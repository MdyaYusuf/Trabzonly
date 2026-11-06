import { apiClient } from '../../core/api/apiClient'
import type { ApiResponse, NoData, PagedResponse } from '../../core/types/ApiResponse'
import type {
  QuizResponseDto,
  QuizListItemDto,
  QuizTakeDto,
  QuizPlatformStatsDto,
  QuizLeaderboardEntryDto,
  QuizUserStatsDto,
  CreatedQuizResponseDto,
  CreateQuizRequest,
  UpdateQuizRequest,
  SubmitQuizRequest,
  CheckQuizAnswerRequest,
  CheckQuizAnswerResponse,
  UserQuizResultResponseDto,
  QuizAdminListItemDto,
  QuizAdminListQuery,
} from './quizTypes'

const API_URL = '/quizzes'

export type GetActiveListParams = {
  categoryId?: number
  sort?: 'most-taken'
}

const getActiveList = async (
  params: GetActiveListParams = {},
): Promise<ApiResponse<QuizListItemDto[]>> => {
  const queryParams = new URLSearchParams()

  if (params.categoryId != null) {
    queryParams.append('categoryId', String(params.categoryId))
  }

  if (params.sort) {
    queryParams.append('sort', params.sort)
  }

  const qs = queryParams.toString() ? `?${queryParams.toString()}` : ''
  return await apiClient<QuizListItemDto[]>(`${API_URL}${qs}`)
}

const getTake = async (id: string): Promise<ApiResponse<QuizTakeDto>> => {
  return await apiClient<QuizTakeDto>(`${API_URL}/${id}/take`)
}

const checkAnswer = async (
  request: CheckQuizAnswerRequest,
): Promise<ApiResponse<CheckQuizAnswerResponse>> => {
  return await apiClient<CheckQuizAnswerResponse>(`${API_URL}/check-answer`, {
    method: 'POST',
    body: JSON.stringify(request),
    silentSuccess: true,
  })
}

const getPlatformStats = async (): Promise<ApiResponse<QuizPlatformStatsDto>> => {
  return await apiClient<QuizPlatformStatsDto>(`${API_URL}/stats/platform`)
}

const getLeaderboard = async (
  take: number = 10,
): Promise<ApiResponse<QuizLeaderboardEntryDto[]>> => {
  const queryParams = new URLSearchParams()
  queryParams.append('take', String(take))
  return await apiClient<QuizLeaderboardEntryDto[]>(
    `${API_URL}/leaderboard?${queryParams.toString()}`,
  )
}

const getMyStats = async (): Promise<ApiResponse<QuizUserStatsDto>> => {
  return await apiClient<QuizUserStatsDto>(`${API_URL}/stats/me`)
}

const getAllForAdmin = async (
  query: QuizAdminListQuery = {},
): Promise<ApiResponse<PagedResponse<QuizAdminListItemDto>>> => {
  const queryParams = new URLSearchParams()

  queryParams.set('pageNumber', String(query.pageNumber ?? 1))
  queryParams.set('pageSize', String(query.pageSize ?? 10))

  if (query.search?.trim()) {
    queryParams.set('search', query.search.trim())
  }

  if (query.isActive !== undefined) {
    queryParams.set('isActive', String(query.isActive))
  }

  if (query.quizCategoryId != null) {
    queryParams.set('quizCategoryId', String(query.quizCategoryId))
  }

  if (query.sort) {
    queryParams.set('sort', query.sort)
  }

  return await apiClient<PagedResponse<QuizAdminListItemDto>>(
    `${API_URL}/manage?${queryParams}`,
  )
}

/** Admin-only full quiz by id (includes IsCorrect). */
const getById = async (id: string): Promise<ApiResponse<QuizResponseDto>> => {
  return await apiClient<QuizResponseDto>(`${API_URL}/${id}`)
}

const add = async (request: CreateQuizRequest): Promise<ApiResponse<CreatedQuizResponseDto>> => {
  return await apiClient<CreatedQuizResponseDto>(API_URL, {
    method: 'POST',
    body: JSON.stringify(request),
  })
}

const update = async (request: UpdateQuizRequest): Promise<ApiResponse<NoData>> => {
  return await apiClient<NoData>(API_URL, {
    method: 'PUT',
    body: JSON.stringify(request),
  })
}

const remove = async (id: string): Promise<ApiResponse<NoData>> => {
  return await apiClient<NoData>(`${API_URL}/${id}`, {
    method: 'DELETE',
  })
}

const submit = async (
  request: SubmitQuizRequest,
): Promise<ApiResponse<UserQuizResultResponseDto>> => {
  return await apiClient<UserQuizResultResponseDto>(`${API_URL}/submit`, {
    method: 'POST',
    body: JSON.stringify(request),
  })
}

const quizService = {
  getActiveList,
  getTake,
  checkAnswer,
  getPlatformStats,
  getLeaderboard,
  getMyStats,
  getAllForAdmin,
  getById,
  add,
  update,
  remove,
  submit,
}

export default quizService
