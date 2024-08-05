import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return response.data;
});

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (id) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    return response.data;
  }
);

export const fetchCommentsByPostId = createAsyncThunk(
  "comments/fetchCommentsByPostId",
  async (postId) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );
    return response.data;
  }
);

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
});

const PostRedux = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    users: [],
    user: {},
    comments: {},
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.user = [action.payload.id] = action.payload;
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
        state.comments[action.meta.arg] = action.payload;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});

export default PostRedux.reducer;
