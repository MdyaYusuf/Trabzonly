// Responses
export interface SeasonResponseDto {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  createdDate: string;
}

// Requests
export interface CreateSeasonRequest {
  name: string;
  startDate: string;
  endDate: string;
}

export interface UpdateSeasonRequest extends CreateSeasonRequest {
  id: string;
}