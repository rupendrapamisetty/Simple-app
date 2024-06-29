import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './posts/PostRedux';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});