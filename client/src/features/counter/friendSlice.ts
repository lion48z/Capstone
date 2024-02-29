import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface FriendState {
    friends: Friend[];
    loading: boolean;
    error: string | null;
  }
  
  interface Friend {
    _id: string;
    firstName: string;
    lastName: string;
    occupation: string;
    picturePath: string;
   
  }
  

const initialState: FriendState = {
  friends: [],
  loading: false,
  error: null,
};

const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    addFriend(state, action: PayloadAction<Friend>) {
      state.friends.push(action.payload);
    },
    removeFriend(state, action: PayloadAction<string>) {
      state.friends = state.friends.filter(friend => friend._id !== action.payload);
    },
    setFriends(state, action: PayloadAction<Friend[]>) {
      state.friends = action.payload;
    },
    
  },
});

export const { addFriend, removeFriend, setFriends } = friendSlice.actions;

export default friendSlice.reducer;
