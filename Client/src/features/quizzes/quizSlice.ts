import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { QuizResponseDto } from './quizTypes';
import type { CursorPagedResponse } from '../../core/types/ApiResponse';

interface QuizState {
  quizzes: QuizResponseDto[];
  mostTakenQuizzes: QuizResponseDto[];
  recentQuizzes: QuizResponseDto[];
  currentQuiz: QuizResponseDto | null;
  nextCursorDate: string | null | undefined;
  nextCursorId: string | null | undefined;
  hasNextPage: boolean;
}

const initialState: QuizState = {
  quizzes: [],
  mostTakenQuizzes: [],
  recentQuizzes: [],
  currentQuiz: null,
  nextCursorDate: null,
  nextCursorId: null,
  hasNextPage: false,
};

export const quizSlice = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {
    setQuizzes: (state, action: PayloadAction<QuizResponseDto[]>) => {
      state.quizzes = action.payload;
    },
    setMostTakenQuizzes: (state, action: PayloadAction<QuizResponseDto[]>) => {
      state.mostTakenQuizzes = action.payload;
    },
    setRecentQuizzes: (state, action: PayloadAction<CursorPagedResponse<QuizResponseDto>>) => {
      state.recentQuizzes = action.payload.items;
      state.nextCursorDate = action.payload.nextCursorDate;
      state.nextCursorId = action.payload.nextCursorId;
      state.hasNextPage = action.payload.hasNextPage;
    },
    setCurrentQuiz: (state, action: PayloadAction<QuizResponseDto>) => {
      state.currentQuiz = action.payload;
    },
    addQuizToState: (state, action: PayloadAction<QuizResponseDto>) => {
      state.quizzes.push(action.payload);
      state.recentQuizzes.unshift(action.payload);
    },
    updateQuizInState: (state, action: PayloadAction<QuizResponseDto>) => {
      const index = state.quizzes.findIndex((q) => q.id === action.payload.id);

      if (index !== -1) {
        state.quizzes[index] = action.payload;
      }

      const recentIndex = state.recentQuizzes.findIndex((q) => q.id === action.payload.id);

      if (recentIndex !== -1) {
        state.recentQuizzes[recentIndex] = action.payload;
      }

      const mostTakenIndex = state.mostTakenQuizzes.findIndex((q) => q.id === action.payload.id);

      if (mostTakenIndex !== -1) {
        state.mostTakenQuizzes[mostTakenIndex] = action.payload;
      }
    },
    removeQuizFromState: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter((q) => q.id !== action.payload);
      state.recentQuizzes = state.recentQuizzes.filter((q) => q.id !== action.payload);
      state.mostTakenQuizzes = state.mostTakenQuizzes.filter((q) => q.id !== action.payload);
    },
    clearQuizState: () => initialState,
  }
});

export const {
  setQuizzes,
  setMostTakenQuizzes,
  setRecentQuizzes,
  setCurrentQuiz,
  addQuizToState,
  updateQuizInState,
  removeQuizFromState,
  clearQuizState
} = quizSlice.actions;

export default quizSlice.reducer;