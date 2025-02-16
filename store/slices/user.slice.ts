import { UserState } from '@rock/models/user-state.model';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserState = {
  exp: 0,
  info: {
    id: 0,
    email: '',
    avatar: '',
    username: '',
    role: { background: '', foreground: '', name: '' },
  },
};

const AUTH_PERSIST_KEY = 'auth';

function loadFromLocalStorage(): UserState {
  if (typeof window === 'undefined') return initialState;

  const savedState = localStorage.getItem(AUTH_PERSIST_KEY);

  return savedState ? JSON.parse(savedState) : initialState;
}

const userSlice = createSlice({
  name: 'user',
  initialState: loadFromLocalStorage(),
  reducers: {
    login(_, { payload }: PayloadAction<UserState>) {
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

export const { login, logout } = userSlice.actions;

export default userSlice;
