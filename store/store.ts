import authSlice from './slices/auth.slice';
import publicationsSlice from './slices/publications.slice';

import {  configureStore } from '@reduxjs/toolkit';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      [publicationsSlice.name]: publicationsSlice.reducer,
    },
    devTools: process.env.NODE_ENV === 'development',
  });
};

export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
