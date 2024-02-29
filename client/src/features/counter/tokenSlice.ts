import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store'

interface TokenState {
  token: string | null; // Define the token property and its type
}

const initialState: TokenState = {
  token: null, // Initial state for the token slice
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload; // Update the token in the state
    },
    clearToken: (state) => {
      state.token = null; // Clear the token from the state
    },
    
  },
});

export const { setToken, clearToken } = tokenSlice.actions;

export const selectToken = (state: RootState) => state.token.token; // Selector to get the token from the state

export default tokenSlice.reducer;

