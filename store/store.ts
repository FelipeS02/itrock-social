import postsSlice from './slices/posts.slice';
import userSlice from './slices/user.slice';

import { configureStore } from '@reduxjs/toolkit';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [userSlice.name]: userSlice.reducer,
      [postsSlice.name]: postsSlice.reducer,
    },
    devTools: process.env.NODE_ENV === 'development',
  });
};

export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
