// Responses
export interface InjuryResponseDto {
  id: string;
  name: string;
  daysInjured: number;
  gamesMissed: number;
  playerId: string;
  playerName: string;
  seasonId?: string;
  seasonName?: string;
  createdDate: string;
}

export interface CreatedInjuryResponseDto {
  id: string;
  name: string;
  playerId: string;
}

// Requests
export interface CreateInjuryRequest {
  name: string;
  daysInjured: number;
  gamesMissed: number;
  playerId: string;
  seasonId?: string;
}

export interface UpdateInjuryRequest extends CreateInjuryRequest {
  id: string;
}