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
  shirtNumber?: number | null;
  averageRating: number;
  ratingCount: number;
  isActive: boolean;
  positionId: string;
  positionName: string;
  currentUserScore?: number | null;
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
  shirtNumber?: number | null;
  averageRating: number;
  ratingCount: number;
  positionName: string;
}

export interface PlayerRatingResponseDto {
  playerId: string;
  score: number;
  averageRating: number;
  ratingCount: number;
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
  shirtNumber?: number | null;
  positionId: string;
  imageFile?: File | null;
}

export interface UpdatePlayerRequest extends CreatePlayerRequest {
  id: string;
  isActive: boolean;
}

export interface RatePlayerRequest {
  score: number;
}
