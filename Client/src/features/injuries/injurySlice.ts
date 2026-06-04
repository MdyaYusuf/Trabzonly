import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { InjuryResponseDto } from './injuryTypes';
import type { PagedResponse } from '../../core/types/ApiResponse';

interface InjuryState {
  injuries: InjuryResponseDto[];
  currentInjury: InjuryResponseDto | null;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

const initialState: InjuryState = {
  injuries: [],
  currentInjury: null,
  totalCount: 0,
  pageNumber: 1,
  pageSize: 10,
};

export const injurySlice = createSlice({
  name: 'injuries',
  initialState,
  reducers: {
    setInjuries: (state, action: PayloadAction<PagedResponse<InjuryResponseDto>>) => {
      state.injuries = action.payload.items;
      state.totalCount = action.payload.totalCount;
      state.pageNumber = action.payload.pageNumber;
      state.pageSize = action.payload.pageSize;
    },
    setCurrentInjury: (state, action: PayloadAction<InjuryResponseDto>) => {
      state.currentInjury = action.payload;
    },
    addInjuryToState: (state, action: PayloadAction<InjuryResponseDto>) => {
      state.injuries.push(action.payload);
    },
    updateInjuryInState: (state, action: PayloadAction<InjuryResponseDto>) => {
      const index = state.injuries.findIndex((i) => i.id === action.payload.id);

      if (index !== -1) {
        state.injuries[index] = action.payload;
      }
    },
    removeInjuryFromState: (state, action: PayloadAction<string>) => {
      state.injuries = state.injuries.filter((i) => i.id !== action.payload);
    },
    clearInjuryState: () => initialState,
  }
});

export const {
  setInjuries,
  setCurrentInjury,
  addInjuryToState,
  updateInjuryInState,
  removeInjuryFromState,
  clearInjuryState
} = injurySlice.actions;

export default injurySlice.reducer;