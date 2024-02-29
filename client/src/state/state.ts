import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  picturePath: string;
  friends?: string[];
  location?: string;                 //? to show that these can be undefined or have a value
  occupation?: string;
  viewedProfile?: number;
  impressions?: number;
}

interface IPost {
  userId: string;
  firstName: string;
  lastName: string;
  picturePath: string;
  userPicturePath: string;
  friends?: string[];
  description?:string;
  location?: string;                 //? to show that these can be undefined or have a value
  occupation?: string;
  viewedProfile?: number;
  impressions?: number;
  likes?: Map<string, boolean>;
  comments?: string[];
}

interface AuthState {
  mode: "light" | "dark";
  user: IUser | null;
  token: string | null;
  posts: IPost[];
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
    setLogin: (state, action: PayloadAction<{ user: IUser; token: string }>) => {
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
    setPosts: (state, action: PayloadAction<{ posts: IPost[] }>) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action: PayloadAction<{ post: IPost }>) => {
      const updatedPosts = state.posts.map((post) => {
        if (post === action.payload.post) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});
/*setPost: (state, action: PayloadAction<{ post: IPost }>) => {
  const updatedPost = action.payload.post;
  const index = state.posts.findIndex(post => post.userId === updatedPost.userId);

  if (index !== -1) {
    state.posts[index] = updatedPost;
  } else {
    console.error("Post not found");
  }
},*/


export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;