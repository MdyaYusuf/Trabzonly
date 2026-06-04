import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RoleResponseDto } from './roleTypes';
import type { PagedResponse } from '../../core/types/ApiResponse';

interface RoleState {
  roles: RoleResponseDto[];
  currentRole: RoleResponseDto | null;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

const initialState: RoleState = {
  roles: [],
  currentRole: null,
  totalCount: 0,
  pageNumber: 1,
  pageSize: 10,
};

export const roleSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    setRoles: (state, action: PayloadAction<PagedResponse<RoleResponseDto>>) => {
      state.roles = action.payload.items;
      state.totalCount = action.payload.totalCount;
      state.pageNumber = action.payload.pageNumber;
      state.pageSize = action.payload.pageSize;
    },
    setCurrentRole: (state, action: PayloadAction<RoleResponseDto>) => {
      state.currentRole = action.payload;
    },
    addRoleToState: (state, action: PayloadAction<RoleResponseDto>) => {
      state.roles.push(action.payload);
    },
    updateRoleInState: (state, action: PayloadAction<{ id: number; name: string }>) => {
      const index = state.roles.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) {
        state.roles[index].name = action.payload.name;
      }
    },
    removeRoleFromState: (state, action: PayloadAction<number>) => {
      state.roles = state.roles.filter((r) => r.id !== action.payload);
    },
    clearRoleState: () => initialState,
  }
});

export const {
  setRoles,
  setCurrentRole,
  addRoleToState,
  updateRoleInState,
  removeRoleFromState,
  clearRoleState
} = roleSlice.actions;

export default roleSlice.reducer;