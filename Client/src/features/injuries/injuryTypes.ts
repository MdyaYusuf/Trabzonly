// Responses
export interface InjuryResponseDto {
  id: number;
  name: string;
  daysInjured: number;
  gamesMissed: number;
  playerId: number;
  playerName: string;
  seasonId?: number;
  seasonName?: string;
  createdDate: string;
}

export interface CreatedInjuryResponseDto {
  id: number;
  name: string;
  playerId: number;
}

// Requests
export interface CreateInjuryRequest {
  name: string;
  daysInjured: number;
  gamesMissed: number;
  playerId: number;
  seasonId?: number;
}

export interface UpdateInjuryRequest extends CreateInjuryRequest {
  id: number;
}
