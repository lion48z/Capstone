import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  _id: string;
  friends: string[];
}

const initialState: UserState = {
  _id: '',
  friends: [],

};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
    addFriend: (state, action: PayloadAction<string>) => {
      state.friends.push(action.payload);
    },
    removeFriend: (state, action: PayloadAction<string>) => {
      state.friends = state.friends.filter(friendId => friendId !== action.payload);
    },
    
  },
});

export const { setUser, addFriend, removeFriend } = userSlice.actions;

export default userSlice.reducer;
