export interface ClubResponseDto {
  id: number
  name: string
  shortName?: string | null
  isTrabzonspor: boolean
}

export interface FixtureClubDto {
  id: number
  name: string
  shortName?: string | null
  isTrabzonspor: boolean
}

export interface FixtureResponseDto {
  id: number
  seasonId: number
  weekNumber: number
  homeClub: FixtureClubDto
  awayClub: FixtureClubDto
  kickoff?: string | null
  homeScore?: number | null
  awayScore?: number | null
}

export interface FixtureWeekResponseDto {
  seasonId: number
  weekNumber: number
  fixtures: FixtureResponseDto[]
}

export interface UpdateFixtureWeekItemRequest {
  id: number
  kickoff?: string | null
  homeScore?: number | null
  awayScore?: number | null
}

export interface UpdateFixtureWeekRequest {
  seasonId: number
  weekNumber: number
  fixtures: UpdateFixtureWeekItemRequest[]
}

export interface LeagueStandingResponseDto {
  id: number
  seasonId: number
  clubId: number
  clubName: string
  clubShortName?: string | null
  isTrabzonspor: boolean
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  points: number
  rank: number
}

export interface LeagueStandingsResponseDto {
  seasonId: number
  standings: LeagueStandingResponseDto[]
}

export type AdminFixtureDraftRow = {
  id: number
  homeClubName: string
  awayClubName: string
  kickoffLocal: string
  homeScore: string
  awayScore: string
}

export interface MatchWeekSlotResponseDto {
  id: number
  playerId: number
  playerName: string
  playerImageUrl?: string | null
  shirtNumber?: number | null
  slotKey: string
  isStarter: boolean
  sortOrder: number
  averageRating: number
  ratingCount: number
  currentUserScore?: number | null
}

export interface MatchWeekResponseDto {
  id?: number | null
  seasonId: number
  formation: string
  slots: MatchWeekSlotResponseDto[]
  updatedDate?: string | null
}

export interface MatchWeekSlotRequest {
  slotKey: string
  sortOrder: number
  playerId: number
}

export interface SaveMatchWeekRequest {
  formation: string
  slots: MatchWeekSlotRequest[]
}

export interface RateMatchWeekPlayerRequest {
  score: number
}

export interface MatchWeekPlayerRatingResponseDto {
  matchWeekId: number
  playerId: number
  score: number
  averageRating: number
  ratingCount: number
}

export interface MatchWeekLeaderboardEntryDto {
  rank: number
  playerId: number
  playerName: string
  playerImageUrl?: string | null
  shirtNumber?: number | null
  slotKey: string
  isStarter: boolean
  averageRating: number
  ratingCount: number
}

export interface MatchWeekLeaderboardResponseDto {
  matchWeekId: number
  entries: MatchWeekLeaderboardEntryDto[]
}
