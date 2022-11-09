import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import API from "../api";
const joinedGroupSlice = createSlice({
    name: 'joinedGroups',
    initialState: {
        data: [],
        error: null,
        status: null
    },
    extraReducers(builder){
        builder
            .addCase(fectchJoinedGroups.fulfilled, (state, action) => {
                 state.data = action.payload 
                 state.status = 'succeed'
            })
            .addCase(fectchJoinedGroups.pending, state => {
                 state.status = 'pending'
            })
            .addCase(fectchJoinedGroups.rejected, state => {
                state.status = 'failed'
                state.error = 'unable to fetch joined groups'
            })
    }
})
export const joinedGroupReducer = joinedGroupSlice.reducer 
export const fectchJoinedGroups = createAsyncThunk('joinedGroups/fectchJoinedGroups', async () => {
    const response = await API.get('/blogs/joined/groups/all')
    return response.data
})