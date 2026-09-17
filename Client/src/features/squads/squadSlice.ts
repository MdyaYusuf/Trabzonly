import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SquadPreviewDto, SquadResponseDto } from './squadTypes';
import type { PagedResponse, CursorPagedResponse } from '../../core/types/ApiResponse';

interface SquadState {
  squads: SquadPreviewDto[];
  currentSquad: SquadResponseDto | null;
  topRatedSquads: SquadPreviewDto[];
  recentSquads: SquadPreviewDto[];
  userSquads: SquadPreviewDto[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  nextCursorDate: string | null | undefined;
  nextCursorId: string | null | undefined;
  hasNextPage: boolean;
}

const initialState: SquadState = {
  squads: [],
  currentSquad: null,
  topRatedSquads: [],
  recentSquads: [],
  userSquads: [],
  totalCount: 0,
  pageNumber: 1,
  pageSize: 10,
  nextCursorDate: null,
  nextCursorId: null,
  hasNextPage: false,
};

export const squadSlice = createSlice({
  name: 'squads',
  initialState,
  reducers: {
    setSquads: (state, action: PayloadAction<PagedResponse<SquadPreviewDto>>) => {
      state.squads = action.payload.items;
      state.totalCount = action.payload.totalCount;
      state.pageNumber = action.payload.pageNumber;
      state.pageSize = action.payload.pageSize;
    },
    setCurrentSquad: (state, action: PayloadAction<SquadResponseDto>) => {
      state.currentSquad = action.payload;
    },
    setTopRatedSquads: (state, action: PayloadAction<SquadPreviewDto[]>) => {
      state.topRatedSquads = action.payload;
    },
    setRecentSquads: (state, action: PayloadAction<CursorPagedResponse<SquadPreviewDto>>) => {
      state.recentSquads = action.payload.items;
      state.nextCursorDate = action.payload.nextCursorDate;
      state.nextCursorId = action.payload.nextCursorId;
      state.hasNextPage = action.payload.hasNextPage;
    },
    setUserSquads: (state, action: PayloadAction<SquadPreviewDto[]>) => {
      state.userSquads = action.payload;
    },
    addSquadToState: (state, action: PayloadAction<SquadPreviewDto>) => {
      state.squads.unshift(action.payload);
      state.recentSquads.unshift(action.payload);
    },
    updateSquadInState: (state, action: PayloadAction<SquadPreviewDto>) => {
      const index = state.squads.findIndex((s) => s.id === action.payload.id);

      if (index !== -1) {
        state.squads[index] = action.payload;
      }

      const recentIndex = state.recentSquads.findIndex((s) => s.id === action.payload.id);

      if (recentIndex !== -1) {
        state.recentSquads[recentIndex] = action.payload;
      }

      const topRatedIndex = state.topRatedSquads.findIndex((s) => s.id === action.payload.id);

      if (topRatedIndex !== -1) {
        state.topRatedSquads[topRatedIndex] = action.payload;
      }

      const userIndex = state.userSquads.findIndex((s) => s.id === action.payload.id);

      if (userIndex !== -1) {
        state.userSquads[userIndex] = action.payload;
      }
    },
    removeSquadFromState: (state, action: PayloadAction<string>) => {
      state.squads = state.squads.filter((s) => s.id !== action.payload);
      state.recentSquads = state.recentSquads.filter((s) => s.id !== action.payload);
      state.topRatedSquads = state.topRatedSquads.filter((s) => s.id !== action.payload);
      state.userSquads = state.userSquads.filter((s) => s.id !== action.payload);

      if (state.currentSquad?.id === action.payload) {
        state.currentSquad = null;
      }
    },
    clearSquadState: () => initialState,
  },
});

export const {
  setSquads,
  setCurrentSquad,
  setTopRatedSquads,
  setRecentSquads,
  setUserSquads,
  addSquadToState,
  updateSquadInState,
  removeSquadFromState,
  clearSquadState,
} = squadSlice.actions;

export default squadSlice.reducer;
