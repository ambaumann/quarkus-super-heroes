import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import fightsReducer from '../features/fight/fightSlice';
import { fightsApi } from './api/fightsApi';

export const store = configureStore({
  reducer: {
    [fightsApi.reducerPath]: fightsApi.reducer,
    fights: fightsReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(fightsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
