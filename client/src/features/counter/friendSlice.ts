import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface FriendState {
    friends: Friend[];
    loading: boolean;
    error: string | null;
    userId: string | null;
  }
  
  interface Friend {
    _id: string;
    userId: string; 
    firstName: string;
    lastName: string;
    occupation: string;
    picturePath: string;
  
   
  }
  

const initialState: FriendState = {
    friends: [],
  loading: false,
  error: null,
  userId: null,
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
    setUserId(state, action: PayloadAction<string | null>) {
      state.userId = action.payload;
    }, 
  },
});

export const { addFriend, removeFriend, setFriends, setUserId  } = friendSlice.actions;

export default friendSlice.reducer;
