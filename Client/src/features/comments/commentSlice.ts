import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CommentResponseDto } from './commentTypes';
import type { PagedResponse, CursorPagedResponse } from '../../core/types/ApiResponse';

interface CommentState {
  comments: CommentResponseDto[];
  recentComments: CommentResponseDto[];
  currentComment: CommentResponseDto | null;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  nextCursorDate: string | null | undefined;
  nextCursorId: string | null | undefined;
  hasNextPage: boolean;
}

const initialState: CommentState = {
  comments: [],
  recentComments: [],
  currentComment: null,
  totalCount: 0,
  pageNumber: 1,
  pageSize: 10,
  nextCursorDate: null,
  nextCursorId: null,
  hasNextPage: false,
};

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<PagedResponse<CommentResponseDto>>) => {
      state.comments = action.payload.items;
      state.totalCount = action.payload.totalCount;
      state.pageNumber = action.payload.pageNumber;
      state.pageSize = action.payload.pageSize;
    },
    setRecentComments: (state, action: PayloadAction<CursorPagedResponse<CommentResponseDto>>) => {
      state.recentComments = action.payload.items;
      state.nextCursorDate = action.payload.nextCursorDate;
      state.nextCursorId = action.payload.nextCursorId;
      state.hasNextPage = action.payload.hasNextPage;
    },
    setCurrentComment: (state, action: PayloadAction<CommentResponseDto>) => {
      state.currentComment = action.payload;
    },
    addCommentToState: (state, action: PayloadAction<CommentResponseDto>) => {
      state.comments.unshift(action.payload);
    },
    updateCommentInState: (state, action: PayloadAction<{ id: string; content: string }>) => {
      const index = state.comments.findIndex((c) => c.id === action.payload.id);

      if (index !== -1) {
        state.comments[index].content = action.payload.content;
      }
      const recentIndex = state.recentComments.findIndex((c) => c.id === action.payload.id);

      if (recentIndex !== -1) {
        state.recentComments[recentIndex].content = action.payload.content;
      }
    },
    removeCommentFromState: (state, action: PayloadAction<string>) => {
      state.comments = state.comments.filter((c) => c.id !== action.payload);
      state.recentComments = state.recentComments.filter((c) => c.id !== action.payload);
    },
    clearCommentState: () => initialState,
  }
});

export const {
  setComments,
  setRecentComments,
  setCurrentComment,
  addCommentToState,
  updateCommentInState,
  removeCommentFromState,
  clearCommentState
} = commentSlice.actions;

export default commentSlice.reducer;