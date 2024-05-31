import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosUtils/axiosConfig";

const initialState = {
  assignValue: [],
  isLoading: false,
  error: null,
};

export const fetchAssignValue = createAsyncThunk(
  "assingValue",
  async (assignValueList, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/wbs/get_issue_assignees", {
        project_id: 17,
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

export const getIssueAssignees = createSlice({
    name: "getIssueAssignees",
    initialState,
    reducers: {},
    extraReducers:(builder)=>  {
     builder.addCase(fetchAssignValue.pending , (state)=> {
        state.isLoading = true;
     });
     builder.addCase(fetchAssignValue.fulfilled, (state, action)=> {
        state.assignValue = action.payload;
        state.isLoading = false;
     });
     builder.addCase(fetchAssignValue.rejected, (state, action)=> {
        state.error = action.payload;
        state.isLoading = false;
     });
    },
  
})
