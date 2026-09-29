// Responses
export interface PositionResponseDto {
  id: number;
  name: string;
  abbreviation: string;
  createdDate: string;
}

// Requests
export interface CreatePositionRequest {
  name: string;
  abbreviation: string;
}

export interface UpdatePositionRequest extends CreatePositionRequest {
  id: number;
}
