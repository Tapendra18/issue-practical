import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosUtils/axiosConfig";

const initialState = {
  issueDetails: [],
  isLoading: false,
  error: null,
};

export const fetchIssueDetails = createAsyncThunk(
  "detailValue",
  async (detailValue, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/issue/overview",
        detailValue,
        {
          params: {
            project_id: 17,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error?.response) {
        if (error.response.status === 500 || error.response.status === 402) {
          return rejectWithValue(error.response.data.message);
        }
      }
    }
  }
);

export const DeleteIssue = createAsyncThunk(
  "deleteValue",
  async (deleteValue, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/issue/delete", deleteValue, {
        params: {
          project_id: 17,
        },
      });
      return response.data;
    } catch (error) {
      if (error?.response) {
        if (error.response.status === 500 || error.response.status === 402) {
          return rejectWithValue(error.response.data.message);
        }
      }
    }
  }
);

export const CloseIssue = createAsyncThunk(
  "CloseIssue",
  async (closeValue, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/issue/change/status", closeValue, {
        params: {
          project_id: 17,
        },
      });
      return response.data;
    } catch (error) {
      if (error?.response) {
        if (error.response.status === 500 || error.response.status === 402) {
          return rejectWithValue(error.response.data.message);
        }
      }
    }
  }
);

export const issueDetailsData = createSlice({
  name: "issueDetailsData",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchIssueDetails.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchIssueDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.issueDetails = action.payload;
    });
    builder.addCase(fetchIssueDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});
