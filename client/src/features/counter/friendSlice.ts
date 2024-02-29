import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface FriendState {
    friendsList: Friend[];
    loading: boolean;
    error: string | null;
  }
  
  interface Friend {
    _id: string;
    name: string;
   
  }
  

const initialState: FriendState = {
  friendsList: [],
  loading: false,
  error: null,
};

const friendSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    addFriend(state, action: PayloadAction<Friend>) {
      state.friendsList.push(action.payload);
    },
    removeFriend(state, action: PayloadAction<string>) {
      state.friendsList = state.friendsList.filter(friend => friend._id !== action.payload);
    },
    // Other friend-related actions
  },
});

export const { addFriend, removeFriend } = friendSlice.actions;

export default friendSlice.reducer;
