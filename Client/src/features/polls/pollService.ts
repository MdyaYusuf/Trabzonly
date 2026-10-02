import { apiClient } from '../../core/api/apiClient'
import type { ApiResponse } from '../../core/types/ApiResponse'
import type { PollResponseDto, VotePollRequest } from './pollTypes'

const API_URL = '/polls'

const getActiveByPlayer = async (
  playerId: number,
): Promise<ApiResponse<PollResponseDto | null>> => {
  return await apiClient<PollResponseDto | null>(`${API_URL}/active/by-player/${playerId}`)
}

const getActiveByPost = async (
  postId: string,
): Promise<ApiResponse<PollResponseDto | null>> => {
  return await apiClient<PollResponseDto | null>(`${API_URL}/active/by-post/${postId}`)
}

const getActiveGlobal = async (): Promise<ApiResponse<PollResponseDto | null>> => {
  return await apiClient<PollResponseDto | null>(`${API_URL}/active/global`)
}

const vote = async (
  pollId: number,
  request: VotePollRequest,
): Promise<ApiResponse<PollResponseDto>> => {
  return await apiClient<PollResponseDto>(`${API_URL}/${pollId}/vote`, {
    method: 'POST',
    body: JSON.stringify(request),
  })
}

const pollService = {
  getActiveByPlayer,
  getActiveByPost,
  getActiveGlobal,
  vote,
}

export default pollService
