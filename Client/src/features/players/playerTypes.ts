// Responses
export interface PlayerResponseDto {
  id: string;
  name: string;
  nationality: string;
  dateOfBirth: string;
  age: number;
  height?: number;
  weight?: number;
  preferredFoot: string;
  marketValue?: number;
  wage?: number;
  currentTeam: string;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
  positionId: string;
  positionName: string;
}

export interface CreatedPlayerResponseDto {
  id: string;
  name: string;
  imageUrl?: string;
}

export interface PlayerPreviewDto {
  id: string;
  name: string;
  nationality: string;
  age: number;
  marketValue?: number;
  currentTeam: string;
  imageUrl?: string;
  positionName: string;
}

// Requests
export interface CreatePlayerRequest {
  name: string;
  nationality: string;
  dateOfBirth: string;
  height?: number;
  weight?: number;
  preferredFoot: string;
  marketValue?: number;
  wage?: number;
  currentTeam: string;
  description?: string;
  positionId: string;
  imageFile?: File | null;
}

export interface UpdatePlayerRequest extends CreatePlayerRequest {
  id: string;
  isActive: boolean;
}