// Responses
export interface PlayerStatsResponseDto {
  id: string;
  team: string;
  appearances: number;
  minutesPlayed: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  cleanSheets: number;
  saves: number;
  goalsConceded: number;
  playerId: string;
  playerName: string;
  seasonId: string;
  seasonName: string;
  createdDate: string;
}

export interface CreatedPlayerStatsResponseDto {
  id: string;
  team: string;
  playerId: string;
  seasonId: string;
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
  saves: number;
  goalsConceded: number;
  playerId: string;
  seasonId: string;
}

export interface UpdatePlayerStatsRequest {
  id: string;
  team: string;
  appearances: number;
  minutesPlayed: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  cleanSheets: number;
  saves: number;
  goalsConceded: number;
  playerId: string;
  seasonId: string;
}