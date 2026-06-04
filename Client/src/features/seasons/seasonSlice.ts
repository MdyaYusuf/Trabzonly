import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SeasonResponseDto } from './seasonTypes';
import type { PagedResponse } from '../../core/types/ApiResponse';

interface SeasonState {
  seasons: SeasonResponseDto[];
  currentSeason: SeasonResponseDto | null;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

const initialState: SeasonState = {
  seasons: [],
  currentSeason: null,
  totalCount: 0,
  pageNumber: 1,
  pageSize: 10,
};

export const seasonSlice = createSlice({
  name: 'seasons',
  initialState,
  reducers: {
    setSeasons: (state, action: PayloadAction<PagedResponse<SeasonResponseDto>>) => {
      state.seasons = action.payload.items;
      state.totalCount = action.payload.totalCount;
      state.pageNumber = action.payload.pageNumber;
      state.pageSize = action.payload.pageSize;
    },
    setCurrentSeason: (state, action: PayloadAction<SeasonResponseDto>) => {
      state.currentSeason = action.payload;
    },
    addSeasonToState: (state, action: PayloadAction<SeasonResponseDto>) => {
      state.seasons.push(action.payload);
    },
    updateSeasonInState: (state, action: PayloadAction<SeasonResponseDto>) => {
      const index = state.seasons.findIndex((s) => s.id === action.payload.id);

      if (index !== -1) {
        state.seasons[index] = action.payload;
      }
    },
    removeSeasonFromState: (state, action: PayloadAction<string>) => {
      state.seasons = state.seasons.filter((s) => s.id !== action.payload);
    },
    clearSeasonState: () => initialState,
  }
});

export const {
  setSeasons,
  setCurrentSeason,
  addSeasonToState,
  updateSeasonInState,
  removeSeasonFromState,
  clearSeasonState
} = seasonSlice.actions;

export default seasonSlice.reducer;