import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PlayerStatsResponseDto } from './playerStatsTypes';
import type { PagedResponse, CursorPagedResponse } from '../../core/types/ApiResponse';

interface PlayerStatsState {
  stats: PlayerStatsResponseDto[];
  currentStats: PlayerStatsResponseDto | null;
  topScorers: PlayerStatsResponseDto[];
  topAssisters: PlayerStatsResponseDto[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  topScorersNextCursorValue: number | null | undefined;
  topScorersNextCursorId: string | null | undefined;
  topScorersHasNextPage: boolean;
  topAssistersNextCursorValue: number | null | undefined;
  topAssistersNextCursorId: string | null | undefined;
  topAssistersHasNextPage: boolean;
}

const initialState: PlayerStatsState = {
  stats: [],
  currentStats: null,
  topScorers: [],
  topAssisters: [],
  totalCount: 0,
  pageNumber: 1,
  pageSize: 10,
  topScorersNextCursorValue: null,
  topScorersNextCursorId: null,
  topScorersHasNextPage: false,
  topAssistersNextCursorValue: null,
  topAssistersNextCursorId: null,
  topAssistersHasNextPage: false,
};

export const playerStatsSlice = createSlice({
  name: 'playerStats',
  initialState,
  reducers: {
    setPlayerStats: (state, action: PayloadAction<PagedResponse<PlayerStatsResponseDto>>) => {
      state.stats = action.payload.items;
      state.totalCount = action.payload.totalCount;
      state.pageNumber = action.payload.pageNumber;
      state.pageSize = action.payload.pageSize;
    },
    setCurrentPlayerStats: (state, action: PayloadAction<PlayerStatsResponseDto>) => {
      state.currentStats = action.payload;
    },
    setTopScorers: (state, action: PayloadAction<CursorPagedResponse<PlayerStatsResponseDto>>) => {
      state.topScorers = action.payload.items;
      state.topScorersNextCursorValue = action.payload.nextCursorValue;
      state.topScorersNextCursorId = action.payload.nextCursorId;
      state.topScorersHasNextPage = action.payload.hasNextPage;
    },
    setTopAssisters: (state, action: PayloadAction<CursorPagedResponse<PlayerStatsResponseDto>>) => {
      state.topAssisters = action.payload.items;
      state.topAssistersNextCursorValue = action.payload.nextCursorValue;
      state.topAssistersNextCursorId = action.payload.nextCursorId;
      state.topAssistersHasNextPage = action.payload.hasNextPage;
    },
    updatePlayerStatsInState: (state, action: PayloadAction<PlayerStatsResponseDto>) => {
      const updateInList = (list: PlayerStatsResponseDto[]) => {
        const index = list.findIndex((s) => s.id === action.payload.id);

        if (index !== -1) {
          list[index] = action.payload;
        }
      };
      updateInList(state.stats);
      updateInList(state.topScorers);
      updateInList(state.topAssisters);
    },
    removePlayerStatsFromState: (state, action: PayloadAction<string>) => {
      state.stats = state.stats.filter((s) => s.id !== action.payload);
      state.topScorers = state.topScorers.filter((s) => s.id !== action.payload);
      state.topAssisters = state.topAssisters.filter((s) => s.id !== action.payload);
    },
    clearPlayerStatsState: () => initialState,
  }
});

export const {
  setPlayerStats,
  setCurrentPlayerStats,
  setTopScorers,
  setTopAssisters,
  updatePlayerStatsInState,
  removePlayerStatsFromState,
  clearPlayerStatsState
} = playerStatsSlice.actions;

export default playerStatsSlice.reducer;