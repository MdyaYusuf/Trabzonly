import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BlogResponseDto } from './blogTypes';
import type { PagedResponse, CursorPagedResponse } from '../../core/types/ApiResponse';

interface BlogState {
  blogs: BlogResponseDto[];
  currentBlog: BlogResponseDto | null;
  topCommentedBlogs: BlogResponseDto[];
  recentBlogs: BlogResponseDto[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  nextCursorDate: string | null | undefined;
  nextCursorId: string | null | undefined;
  hasNextPage: boolean;
}

const initialState: BlogState = {
  blogs: [],
  currentBlog: null,
  topCommentedBlogs: [],
  recentBlogs: [],
  totalCount: 0,
  pageNumber: 1,
  pageSize: 10,
  nextCursorDate: null,
  nextCursorId: null,
  hasNextPage: false,
};

export const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs: (state, action: PayloadAction<PagedResponse<BlogResponseDto>>) => {
      state.blogs = action.payload.items;
      state.totalCount = action.payload.totalCount;
      state.pageNumber = action.payload.pageNumber;
      state.pageSize = action.payload.pageSize;
    },
    setCurrentBlog: (state, action: PayloadAction<BlogResponseDto>) => {
      state.currentBlog = action.payload;
    },
    setTopCommentedBlogs: (state, action: PayloadAction<BlogResponseDto[]>) => {
      state.topCommentedBlogs = action.payload;
    },
    setRecentBlogs: (state, action: PayloadAction<CursorPagedResponse<BlogResponseDto>>) => {
      state.recentBlogs = action.payload.items;
      state.nextCursorDate = action.payload.nextCursorDate;
      state.nextCursorId = action.payload.nextCursorId;
      state.hasNextPage = action.payload.hasNextPage;
    },
    addBlogToState: (state, action: PayloadAction<BlogResponseDto>) => {
      state.blogs.unshift(action.payload);
      state.recentBlogs.unshift(action.payload);
    },
    updateBlogInState: (state, action: PayloadAction<BlogResponseDto>) => {
      const index = state.blogs.findIndex((b) => b.id === action.payload.id);

      if (index !== -1) {
        state.blogs[index] = action.payload;
      }
      const recentIndex = state.recentBlogs.findIndex((b) => b.id === action.payload.id);

      if (recentIndex !== -1) {
        state.recentBlogs[recentIndex] = action.payload;
      }
      const topCommentedIndex = state.topCommentedBlogs.findIndex((b) => b.id === action.payload.id);

      if (topCommentedIndex !== -1) {
        state.topCommentedBlogs[topCommentedIndex] = action.payload;
      }
    },
    removeBlogFromState: (state, action: PayloadAction<string>) => {
      state.blogs = state.blogs.filter((b) => b.id !== action.payload);
      state.recentBlogs = state.recentBlogs.filter((b) => b.id !== action.payload);
      state.topCommentedBlogs = state.topCommentedBlogs.filter((b) => b.id !== action.payload);
    },
    clearBlogState: () => initialState,
  }
});

export const {
  setBlogs,
  setCurrentBlog,
  setTopCommentedBlogs,
  setRecentBlogs,
  addBlogToState,
  updateBlogInState,
  removeBlogFromState,
  clearBlogState
} = blogSlice.actions;

export default blogSlice.reducer;