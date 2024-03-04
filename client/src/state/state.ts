import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
export interface Post {
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



interface AuthState {
  mode: "light" | "dark";
  user: User | null;
  token: string | null;
  posts: Post[]; // Define the type of your posts array
}

const initialState: AuthState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action: PayloadAction<{ friends: any[] }>) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action: PayloadAction<{ posts: Post[] }>) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action: PayloadAction<{ post: Post}>) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;
