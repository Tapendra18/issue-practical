import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosUtils/axiosConfig";

const initialState = {
  addIssueData: [],
  isLoading: false,
  error: null,
};

export const AddIssueDataApi = createAsyncThunk(
  "addissue",
  async (addIssueValue, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/issue/add", addIssueValue, {
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
      return rejectWithValue("An unexpected error occurred. Please try again.");
    }
  }
);

export const UpdateIssueData = createAsyncThunk(
  "updateissue",
  async (updateIssueValue, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/issue/add",
        updateIssueValue,
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
      return rejectWithValue("An unexpected error occurred. Please try again.");
    }
  }
);

export const AddIssueDataValue = createSlice({
  name: "AddIssueDataValue",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders.addCase(AddIssueDataApi.pending, (state, action) => {
      state.isLoading = true;
    });
    builders.addCase(AddIssueDataApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.addIssueData = action.payload;
    });
    builders.addCase(AddIssueDataApi.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});
