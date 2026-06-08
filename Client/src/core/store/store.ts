import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/authSlice";
import roleReducer from "../../features/roles/roleSlice";
import playerReducer from "../../features/players/playerSlice";
import commentReducer from "../../features/comments/commentSlice";
import postReducer from "../../features/posts/postSlice";
import categoryReducer from "../../features/categories/categorySlice";
import injuryReducer from "../../features/injuries/injurySlice";
import positionReducer from "../../features/positions/positionSlice";
import quizReducer from "../../features/quizzes/quizSlice";
import seasonReducer from "../../features/seasons/seasonSlice";
import playerStatsReducer from "../../features/stats/playerStatsSlice";
import userReducer from "../../features/users/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    roles: roleReducer,
    players: playerReducer,
    comments: commentReducer,
    posts: postReducer,
    categories: categoryReducer,
    injuries: injuryReducer,
    positions: positionReducer,
    quizzes: quizReducer,
    seasons: seasonReducer,
    playerStats: playerStatsReducer,
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;