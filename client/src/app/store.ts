import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/counter/userSlice'; 
import  tokenReducer  from '../features/counter/tokenSlice';
import friendReducer from '../features/counter/friendSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    token: tokenReducer,
    friend: friendReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
