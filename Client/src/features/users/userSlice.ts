import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserResponseDto, UserPreviewDto } from './userTypes';
import type { PagedResponse, CursorPagedResponse } from '../../core/types/ApiResponse';

interface UserState {
  users: UserResponseDto[];
  currentUser: UserResponseDto | null;
  topContributors: UserPreviewDto[];
  newestMembers: UserPreviewDto[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  newestMembersNextCursorDate: string | null | undefined;
  newestMembersNextCursorId: string | null | undefined;
  newestMembersHasNextPage: boolean;
}

const initialState: UserState = {
  users: [],
  currentUser: null,
  topContributors: [],
  newestMembers: [],
  totalCount: 0,
  pageNumber: 1,
  pageSize: 10,
  newestMembersNextCursorDate: null,
  newestMembersNextCursorId: null,
  newestMembersHasNextPage: false,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<PagedResponse<UserResponseDto>>) => {
      state.users = action.payload.items;
      state.totalCount = action.payload.totalCount;
      state.pageNumber = action.payload.pageNumber;
      state.pageSize = action.payload.pageSize;
    },
    setCurrentUser: (state, action: PayloadAction<UserResponseDto>) => {
      state.currentUser = action.payload;
    },
    setTopContributors: (state, action: PayloadAction<UserPreviewDto[]>) => {
      state.topContributors = action.payload;
    },
    setNewestMembers: (state, action: PayloadAction<CursorPagedResponse<UserPreviewDto>>) => {
      state.newestMembers = action.payload.items;
      state.newestMembersNextCursorDate = action.payload.nextCursorDate;
      state.newestMembersNextCursorId = action.payload.nextCursorId;
      state.newestMembersHasNextPage = action.payload.hasNextPage;
    },
    updateUserInState: (state, action: PayloadAction<UserResponseDto>) => {
      const index = state.users.findIndex((u) => u.id === action.payload.id);

      if (index !== -1) {
        state.users[index] = action.payload;
      }

      if (state.currentUser?.id === action.payload.id) {
        state.currentUser = action.payload;
      }
    },
    removeUserFromState: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((u) => u.id !== action.payload);
      state.topContributors = state.topContributors.filter((u) => u.id !== action.payload);
      state.newestMembers = state.newestMembers.filter((u) => u.id !== action.payload);

      if (state.currentUser?.id === action.payload) {
        state.currentUser = null;
      }
    },
    clearUserState: () => initialState,
  }
});

export const {
  setUsers,
  setCurrentUser,
  setTopContributors,
  setNewestMembers,
  updateUserInState,
  removeUserFromState,
  clearUserState
} = userSlice.actions;

export default userSlice.reducer;