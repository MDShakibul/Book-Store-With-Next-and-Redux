import { configureStore } from '@reduxjs/toolkit'
import authReducher from './features/auth/authSlice';
import { api } from './api/apiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducher,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch