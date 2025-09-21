import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export type UserRole = 'factory' | 'business' | 'bank' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  token?: string;
  isLoggedIn: boolean;
}

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signup: (state, action: PayloadAction<Omit<User, 'id' | 'isLoggedIn'>>) => {
      state.user = {
        ...action.payload,
        id: uuidv4(),
        isLoggedIn: true,
      };
    },
    login: (state, action: PayloadAction<Omit<User, 'isLoggedIn'>>) => {
      state.user = {
        ...action.payload,
        isLoggedIn: true,
      };
    },
    logout: (state) => {
      state.user = null;
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { signup, login, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
