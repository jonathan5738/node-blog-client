import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import API from "../api";
const blogGroupsCountSlice = createSlice({
    name: 'blogGroupCount',
    initialState: {
        data: 0,
        error: null,
        status: null
    },
    extraReducers(builder){
        builder
            .addCase(fetchPrivateBlogGroupNumber.fulfilled, (state, action) => {
                state.data = action.payload
            })
            .addCase(fetchPrivateBlogGroupNumber.pending, state => {
                state.status = 'pending'
            })
            .addCase(fetchPrivateBlogGroupNumber.rejected, state => {
                state.status = 'failed'
                state.error = 'unable to fetch count'
            })
    }
})
export const numberBlogGroupReducer = blogGroupsCountSlice.reducer
export const fetchPrivateBlogGroupNumber = createAsyncThunk('blogGroupCount/fetchPrivateBlogGroupNumber', async () => {
    const response = await API.get('/blogs/all/count')
    return response.data.countBlogGroup 
})
