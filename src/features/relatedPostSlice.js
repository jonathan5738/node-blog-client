import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' 
import API from '../api'
const relatedPostSlice = createSlice({
    name: 'relatedPost',
    initialState: {
        data: [],
        error: null,
        status: null
    },
    extraReducers(builder){
        builder
            .addCase(fetchRelatedPosts.fulfilled, (state, action) => {
                state.data = action.payload 
                state.status = 'succeed'
            })
            .addCase(fetchRelatedPosts.pending, state => {
                state.status = 'pending'
            })
            .addCase(fetchRelatedPosts.rejected, state => {
                 state.error = 'unable to fetch related post'
                 state.status = 'failed'
            })
    }
})

export const relatedPostReducer = relatedPostSlice.reducer 
export const fetchRelatedPosts = createAsyncThunk('relatedPost/fetchRelatedPosts', async (blog_id) => {
    const response = await API.get(`/blogs/${blog_id}/posts/all`)
    return response.data
})