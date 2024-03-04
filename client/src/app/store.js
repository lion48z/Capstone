import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../state/state'
import friendReducer from '../features/counter/friendSlice'
import userReducer from '../features/counter/userSlice'
import postReducer from '../features/counter/postSlice'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
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
