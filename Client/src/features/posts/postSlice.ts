import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PostResponseDto } from './postTypes';
import type { PagedResponse, CursorPagedResponse } from '../../core/types/ApiResponse';

interface PostState {
  posts: PostResponseDto[];
  currentPost: PostResponseDto | null;
  topCommentedPosts: PostResponseDto[];
  recentPosts: PostResponseDto[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  nextCursorDate: string | null | undefined;
  nextCursorId: string | null | undefined;
  hasNextPage: boolean;
}

const initialState: PostState = {
  posts: [],
  currentPost: null,
  topCommentedPosts: [],
  recentPosts: [],
  totalCount: 0,
  pageNumber: 1,
  pageSize: 10,
  nextCursorDate: null,
  nextCursorId: null,
  hasNextPage: false,
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<PagedResponse<PostResponseDto>>) => {
      state.posts = action.payload.items;
      state.totalCount = action.payload.totalCount;
      state.pageNumber = action.payload.pageNumber;
      state.pageSize = action.payload.pageSize;
    },
    setCurrentPost: (state, action: PayloadAction<PostResponseDto>) => {
      state.currentPost = action.payload;
    },
    setTopCommentedPosts: (state, action: PayloadAction<PostResponseDto[]>) => {
      state.topCommentedPosts = action.payload;
    },
    setRecentPosts: (state, action: PayloadAction<CursorPagedResponse<PostResponseDto>>) => {
      state.recentPosts = action.payload.items;
      state.nextCursorDate = action.payload.nextCursorDate;
      state.nextCursorId = action.payload.nextCursorId;
      state.hasNextPage = action.payload.hasNextPage;
    },
    addPostToState: (state, action: PayloadAction<PostResponseDto>) => {
      state.posts.unshift(action.payload);
      state.recentPosts.unshift(action.payload);
    },
    updatePostInState: (state, action: PayloadAction<PostResponseDto>) => {
      const index = state.posts.findIndex((p) => p.id === action.payload.id);

      if (index !== -1) {
        state.posts[index] = action.payload;
      }
      const recentIndex = state.recentPosts.findIndex((p) => p.id === action.payload.id);

      if (recentIndex !== -1) {
        state.recentPosts[recentIndex] = action.payload;
      }
      const topCommentedIndex = state.topCommentedPosts.findIndex((p) => p.id === action.payload.id);

      if (topCommentedIndex !== -1) {
        state.topCommentedPosts[topCommentedIndex] = action.payload;
      }
    },
    removePostFromState: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((p) => p.id !== action.payload);
      state.recentPosts = state.recentPosts.filter((p) => p.id !== action.payload);
      state.topCommentedPosts = state.topCommentedPosts.filter((p) => p.id !== action.payload);
    },
    clearPostState: () => initialState,
  }
});

export const {
  setPosts,
  setCurrentPost,
  setTopCommentedPosts,
  setRecentPosts,
  addPostToState,
  updatePostInState,
  removePostFromState,
  clearPostState
} = postSlice.actions;

export default postSlice.reducer;