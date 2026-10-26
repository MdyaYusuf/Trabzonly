import { apiClient } from '../../core/api/apiClient'
import type { ApiResponse, NoData } from '../../core/types/ApiResponse'
import type {
  QuizCategory,
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
} from './quizTypes'

const API_URL = '/quizzes'

export type GetActiveListParams = {
  category?: QuizCategory
  sort?: 'most-taken'
}

const getActiveList = async (
  params: GetActiveListParams = {},
): Promise<ApiResponse<QuizListItemDto[]>> => {
  const queryParams = new URLSearchParams()

  if (params.category != null) {
    queryParams.append('category', String(params.category))
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

/** Admin-only full list including inactive quizzes and correct answers. */
const getAllForAdmin = async (): Promise<ApiResponse<QuizResponseDto[]>> => {
  return await apiClient<QuizResponseDto[]>(`${API_URL}/manage`)
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
