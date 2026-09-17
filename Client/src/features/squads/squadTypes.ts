// Responses
export interface SquadSlotResponseDto {
  id: string;
  slotKey: string;
  sortOrder: number;
  playerId: string;
  playerName: string;
  playerImageUrl?: string;
  positionAbbreviation: string;
}

export interface SquadResponseDto {
  id: string;
  title: string;
  formation: string;
  userId: string;
  authorUsername: string;
  averageRating: number;
  ratingCount: number;
  createdDate: string;
  slots: SquadSlotResponseDto[];
  currentUserScore?: number | null;
}

export interface CreatedSquadResponseDto {
  id: string;
  title: string;
  formation: string;
}

export interface SquadPreviewDto {
  id: string;
  title: string;
  formation: string;
  userId: string;
  authorUsername: string;
  averageRating: number;
  ratingCount: number;
  createdDate: string;
}

export interface SquadRatingResponseDto {
  squadId: string;
  score: number;
  averageRating: number;
  ratingCount: number;
}

// Requests
export interface SquadSlotRequest {
  slotKey: string;
  sortOrder: number;
  playerId: string;
}

export interface CreateSquadRequest {
  title: string;
  formation: string;
  slots: SquadSlotRequest[];
}

export interface UpdateSquadRequest extends CreateSquadRequest {
  id: string;
}

export interface RateSquadRequest {
  score: number;
}
