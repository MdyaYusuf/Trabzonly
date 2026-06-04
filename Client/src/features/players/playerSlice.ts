import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PlayerResponseDto } from './playerTypes';
import type { PagedResponse, CursorPagedResponse } from '../../core/types/ApiResponse';

interface PlayerState {
  players: PlayerResponseDto[];
  currentPlayer: PlayerResponseDto | null;
  topValuedPlayers: PlayerResponseDto[];
  mostCommentedPlayers: PlayerResponseDto[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  nextCursorValue: number | null | undefined;
  nextCursorId: string | null | undefined;
  hasNextPage: boolean;
}

const initialState: PlayerState = {
  players: [],
  currentPlayer: null,
  topValuedPlayers: [],
  mostCommentedPlayers: [],
  totalCount: 0,
  pageNumber: 1,
  pageSize: 10,
  nextCursorValue: null,
  nextCursorId: null,
  hasNextPage: false,
};

export const playerSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setPlayers: (state, action: PayloadAction<PagedResponse<PlayerResponseDto>>) => {
      state.players = action.payload.items;
      state.totalCount = action.payload.totalCount;
      state.pageNumber = action.payload.pageNumber;
      state.pageSize = action.payload.pageSize;
    },
    setCurrentPlayer: (state, action: PayloadAction<PlayerResponseDto>) => {
      state.currentPlayer = action.payload;
    },
    setTopValuedPlayers: (state, action: PayloadAction<CursorPagedResponse<PlayerResponseDto>>) => {
      state.topValuedPlayers = action.payload.items;
      state.nextCursorValue = action.payload.nextCursorValue;
      state.nextCursorId = action.payload.nextCursorId;
      state.hasNextPage = action.payload.hasNextPage;
    },
    setMostCommentedPlayers: (state, action: PayloadAction<PlayerResponseDto[]>) => {
      state.mostCommentedPlayers = action.payload;
    },
    removePlayerFromState: (state, action: PayloadAction<string>) => {
      state.players = state.players.filter((p) => p.id !== action.payload);
    },
    clearPlayerState: () => initialState,
  }
});

export const {
  setPlayers,
  setCurrentPlayer,
  setTopValuedPlayers,
  setMostCommentedPlayers,
  removePlayerFromState,
  clearPlayerState
} = playerSlice.actions;

export default playerSlice.reducer;