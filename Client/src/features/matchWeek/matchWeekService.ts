import { apiClient } from '../../core/api/apiClient'
import type { ApiResponse } from '../../core/types/ApiResponse'
import type {
  ClubResponseDto,
  FixtureWeekResponseDto,
  LeagueStandingsResponseDto,
  MatchWeekResponseDto,
  SaveMatchWeekRequest,
  UpdateFixtureWeekRequest,
} from './matchWeekTypes'

const FIXTURES_URL = '/fixtures'
const CLUBS_URL = '/clubs'
const STANDINGS_URL = '/league-standings'
const MATCH_WEEKS_URL = '/match-weeks'

const getClubs = async (): Promise<ApiResponse<ClubResponseDto[]>> => {
  return await apiClient<ClubResponseDto[]>(CLUBS_URL)
}

const getWeekFixtures = async (
  weekNumber: number,
  seasonId?: number,
): Promise<ApiResponse<FixtureWeekResponseDto>> => {
  const queryParams = new URLSearchParams({
    weekNumber: String(weekNumber),
  })

  if (seasonId != null) {
    queryParams.set('seasonId', String(seasonId))
  }

  return await apiClient<FixtureWeekResponseDto>(`${FIXTURES_URL}?${queryParams}`)
}

const updateWeekFixtures = async (
  request: UpdateFixtureWeekRequest,
): Promise<ApiResponse<FixtureWeekResponseDto>> => {
  return await apiClient<FixtureWeekResponseDto>(`${FIXTURES_URL}/week`, {
    method: 'PUT',
    body: JSON.stringify(request),
  })
}

const rebuildStandings = async (
  seasonId?: number,
): Promise<ApiResponse<LeagueStandingsResponseDto>> => {
  const queryParams = new URLSearchParams()

  if (seasonId != null) {
    queryParams.set('seasonId', String(seasonId))
  }

  const query = queryParams.toString()

  return await apiClient<LeagueStandingsResponseDto>(
    `${FIXTURES_URL}/standings/rebuild${query ? `?${query}` : ''}`,
    {
      method: 'POST',
    },
  )
}

const getStandings = async (
  seasonId?: number,
): Promise<ApiResponse<LeagueStandingsResponseDto>> => {
  const queryParams = new URLSearchParams()

  if (seasonId != null) {
    queryParams.set('seasonId', String(seasonId))
  }

  const query = queryParams.toString()

  return await apiClient<LeagueStandingsResponseDto>(
    `${STANDINGS_URL}${query ? `?${query}` : ''}`,
  )
}

const getCurrent = async (): Promise<ApiResponse<MatchWeekResponseDto>> => {
  return await apiClient<MatchWeekResponseDto>(`${MATCH_WEEKS_URL}/current`)
}

const saveCurrent = async (
  request: SaveMatchWeekRequest,
): Promise<ApiResponse<MatchWeekResponseDto>> => {
  return await apiClient<MatchWeekResponseDto>(`${MATCH_WEEKS_URL}/current`, {
    method: 'PUT',
    body: JSON.stringify(request),
  })
}

const startNewWeek = async (
  request: SaveMatchWeekRequest,
): Promise<ApiResponse<MatchWeekResponseDto>> => {
  return await apiClient<MatchWeekResponseDto>(`${MATCH_WEEKS_URL}/current/new-week`, {
    method: 'POST',
    body: JSON.stringify(request),
  })
}

const matchWeekService = {
  getClubs,
  getWeekFixtures,
  updateWeekFixtures,
  rebuildStandings,
  getStandings,
  getCurrent,
  saveCurrent,
  startNewWeek,
}

export default matchWeekService
