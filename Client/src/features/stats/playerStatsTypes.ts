// Responses
export interface PlayerStatsResponseDto {
  id: number;
  team: string;
  appearances: number;
  minutesPlayed: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  cleanSheets: number;
  goalsConceded: number;
  playerId: number;
  playerName: string;
  seasonId: number;
  seasonName: string;
  createdDate: string;
}

export interface CreatedPlayerStatsResponseDto {
  id: number;
  team: string;
  playerId: number;
  seasonId: number;
}

// Requests
export interface CreatePlayerStatsRequest {
  team: string;
  appearances: number;
  minutesPlayed: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  cleanSheets: number;
  goalsConceded: number;
  playerId: number;
  seasonId: number;
}

export interface UpdatePlayerStatsRequest {
  id: number;
  team: string;
  appearances: number;
  minutesPlayed: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  cleanSheets: number;
  goalsConceded: number;
  playerId: number;
  seasonId: number;
}