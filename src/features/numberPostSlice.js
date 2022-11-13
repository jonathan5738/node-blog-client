import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import API from "../api";
const numberPostSlice =createSlice({
    name: 'numberPost',
    initialState: {
        data: 0,
        error: null,
        status: null
    },
    extraReducers(builder){
        builder
            .addCase(fetchNumberPost.fulfilled, (state, action) => {
                state.data = action.payload 
                state.status = 'succeed'
            })
            .addCase(fetchNumberPost.pending, state => {
                state.status = 'pending'
            })
            .addCase(fetchNumberPost.rejected, state => {
                state.status = 'failed'
                state.error = 'unable to fetch posts count'
            })

            .addCase(fetchAllPostCount.fulfilled, (state, action) => {
                state.data = action.payload 
                state.status = 'succeed'
            })
            .addCase(fetchAllPostCount.pending, state => {
                state.status = 'pending'
            })
            .addCase(fetchAllPostCount.rejected, state => {
                state.status = 'failed'
                state.error = 'unable to fetch all posts count'
            })
    }
})

export const numberPostReducer = numberPostSlice.reducer 
export const fetchAllPostCount = createAsyncThunk('numberPost/fetchAllPostCount', async () => {
    const response = await API.get(`/blogs/all/posts/count`)
    return response.data.postCount
})
export const fetchNumberPost = createAsyncThunk('numberPost/fetchNumberPost', async ({blog_id}) => {
    const response = await API.get(`/blogs/${blog_id}/posts/count`)
    return response.data.postCount
})