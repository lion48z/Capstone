
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Post {
    _id: string;
    userId: string;
    firstName: string;
    lastName: string;
    location: string;
    picturePath: string;
    userPicturePath: string;
    description?: string;
    likes: Map<string, boolean>;
    comments?: string[];
  }
  
  interface PostState {
    posts: Post[];
  }
  
  const initialState: PostState = {
    posts: [],
  };

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
        state.posts = action.payload;
      },
      addPost(state, action: PayloadAction<Post>) {
        state.posts.push(action.payload);
      }
  },
});


export const { setPosts, addPost } = postSlice.actions;

export default postSlice.reducer;