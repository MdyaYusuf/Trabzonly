import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PositionResponseDto } from './positionTypes';
import type { PagedResponse } from '../../core/types/ApiResponse';

interface PositionState {
  positions: PositionResponseDto[];
  currentPosition: PositionResponseDto | null;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

const initialState: PositionState = {
  positions: [],
  currentPosition: null,
  totalCount: 0,
  pageNumber: 1,
  pageSize: 10,
};

export const positionSlice = createSlice({
  name: 'positions',
  initialState,
  reducers: {
    setPositions: (state, action: PayloadAction<PagedResponse<PositionResponseDto>>) => {
      state.positions = action.payload.items;
      state.totalCount = action.payload.totalCount;
      state.pageNumber = action.payload.pageNumber;
      state.pageSize = action.payload.pageSize;
    },
    setCurrentPosition: (state, action: PayloadAction<PositionResponseDto>) => {
      state.currentPosition = action.payload;
    },
    addPositionToState: (state, action: PayloadAction<PositionResponseDto>) => {
      state.positions.push(action.payload);
    },
    updatePositionInState: (state, action: PayloadAction<PositionResponseDto>) => {
      const index = state.positions.findIndex((p) => p.id === action.payload.id);

      if (index !== -1) {
        state.positions[index] = action.payload;
      }
    },
    removePositionFromState: (state, action: PayloadAction<string>) => {
      state.positions = state.positions.filter((p) => p.id !== action.payload);
    },
    clearPositionState: () => initialState,
  }
});

export const {
  setPositions,
  setCurrentPosition,
  addPositionToState,
  updatePositionInState,
  removePositionFromState,
  clearPositionState
} = positionSlice.actions;

export default positionSlice.reducer;