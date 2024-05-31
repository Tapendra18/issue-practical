import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosUtils/axiosConfig";

const initialState = {
  commentData: [],
  isLoading: false,
  error: null,
};

export const fetchComment = createAsyncThunk(
  "addComment",
  async (comment, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/issue/comment/add", comment, {
        params: {
          project_id: 17,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const GetComment = createAsyncThunk(
    "getComment",
    async (comment, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post("/issue/comment/list", comment, {
          params: {
            project_id: 17,
          },
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  
);

export const DeleteComment = createAsyncThunk(
  "deleteComment",
  async (comment, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/issue/comment/delete", comment, {
        params: {
          project_id: 17,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
)

export const CommentApiCall = createSlice({
  name: "CommentApiCall",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComment.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.commentData = action.payload;
    });
    builder.addCase(fetchComment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(GetComment.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(GetComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.commentData = action.payload;
    });
    builder.addCase(GetComment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});
