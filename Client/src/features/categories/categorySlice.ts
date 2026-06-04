import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CategoryResponseDto } from './categoryTypes';
import type { PagedResponse } from '../../core/types/ApiResponse';

interface CategoryState {
  categories: CategoryResponseDto[];
  currentCategory: CategoryResponseDto | null;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

const initialState: CategoryState = {
  categories: [],
  currentCategory: null,
  totalCount: 0,
  pageNumber: 1,
  pageSize: 10,
};

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<PagedResponse<CategoryResponseDto>>) => {
      state.categories = action.payload.items;
      state.totalCount = action.payload.totalCount;
      state.pageNumber = action.payload.pageNumber;
      state.pageSize = action.payload.pageSize;
    },
    setCurrentCategory: (state, action: PayloadAction<CategoryResponseDto>) => {
      state.currentCategory = action.payload;
    },
    addCategoryToState: (state, action: PayloadAction<CategoryResponseDto>) => {
      state.categories.push(action.payload);
    },
    updateCategoryInState: (state, action: PayloadAction<CategoryResponseDto>) => {
      const index = state.categories.findIndex((c) => c.id === action.payload.id);

      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
    removeCategoryFromState: (state, action: PayloadAction<number>) => {
      state.categories = state.categories.filter((c) => c.id !== action.payload);
    },
    clearCategoryState: () => initialState,
  }
});

export const {
  setCategories,
  setCurrentCategory,
  addCategoryToState,
  updateCategoryInState,
  removeCategoryFromState,
  clearCategoryState
} = categorySlice.actions;

export default categorySlice.reducer;