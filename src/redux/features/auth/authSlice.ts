import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AuthState {
  user: string;
  token: string;
}

const initialState: AuthState = {
  user: '',
  token: localStorage.getItem('token') || '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registration: (state, action: PayloadAction<Partial<AuthState>>) => {
      state.token = action.payload.token as string;
    },
    login: (state, action: PayloadAction<Partial<AuthState>>) => {
      state.token = action.payload.token as string;
    },
    remove: (state) => {
      state.token = "";
    },
    
  },
});

export const { registration, login, remove } = authSlice.actions;
export default authSlice.reducer;
