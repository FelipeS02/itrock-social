import { AuthState } from '@rock/models/auth-state.model';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthState = {
  exp: 0,
  user: {
    email: '',
    role: { background: '', foreground: '', name: '' },
    username: '',
  },
};

const AUTH_PERSIST_KEY = 'auth';

function loadFromLocalStorage() {
  if (typeof window === 'undefined') return initialState;

  const savedState = localStorage.getItem(AUTH_PERSIST_KEY);

  return savedState ? JSON.parse(savedState) : initialState;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: loadFromLocalStorage(),
  reducers: {
    login(_, { payload }: PayloadAction<AuthState>) {
      // Persist data
      localStorage.setItem(AUTH_PERSIST_KEY, JSON.stringify(payload));

      return payload;
    },
    logout() {
      // Remove persisted session
      localStorage.removeItem(AUTH_PERSIST_KEY);

      return initialState;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice;
