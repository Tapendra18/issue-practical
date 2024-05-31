import { createAsyncThunk , createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../axiosUtils/axiosConfig";

const initialState = {
    issueData : [],
    isLoading : false,
    error: null,
}

export const issuelistingData = createAsyncThunk(
    "issuelistingData",
    async(listing , {rejectWithValue}) => {
        try{
            const response = await axiosInstance.post("/issue/list" , {project_id: 17 , filter: "all"});
            return response.data;
        }catch(error){
            if(error?.response) {
                if (error.response.status === 500 || error.response.status === 402) {
                    return rejectWithValue(error.response.data.message);
                  }
            }
            return rejectWithValue("An unexpected error occurred. Please try again.");
        }

    }   
);

export const issueListing = createSlice({
    name : "issueListing",
    initialState,
    reducers : {
        setIssueListing : (state, action) => {
            state.Data = action.payload;
        }
    },
    extraReducers :(builder) =>  {

        builder.addCase(issuelistingData.pending, (state )=> {
            state.isLoading = true;
        });
        builder.addCase(issuelistingData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.issueData = action.payload;
        });
        builder.addCase(issuelistingData.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });



        // [issuelistingData.pending] : (state) => {
        //     state.isLoading = true;
        // },
        // [issuelistingData.fulfilled] : (state, action) => {
        //     state.isLoading = false;
        //     state.Data = action.payload;
        // },
        // [issuelistingData.rejected] : (state, action) => {
        //     state.isLoading = false;
        //     state.error = action.payload;
        // }
    }
})