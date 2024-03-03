import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store'

export interface User {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  picturePath?: string;
  friends?: string[];
  location?: string;                 //? to show that these can be undefined or have a value
  occupation?: string;
  viewedProfile?: number;
  impressions?: number;
}

interface UserState {
  _id: string;
  friends: string[];
  userId?: string;
  picturePath: string;
}

const initialState: UserState = {
  _id: '',
  friends: [],
  userId: '',
  picturePath: '',
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
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
  },
});

export const { setUser, addFriend, removeFriend, setUserId } = userSlice.actions;

export default userSlice.reducer;

