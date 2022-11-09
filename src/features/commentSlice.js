import { createSlice, createAsyncThunk} from "@reduxjs/toolkit"; 
import API from "../api";
const commentSlice = createSlice({
    name: 'comments',
    initialState: {
        data: [],
        status: null,
        error: null
    },
    extraReducers(builder){
        builder
            .addCase(addComment.fulfilled, (state, action) => {
                 state.data = action.payload 
                 state.status = 'succeed'
            })
            .addCase(addComment.pending, state => {
                state.status = 'pending'
            })
            .addCase(addComment.rejected, state => {
                state.status = 'failed'
                state.error = 'unable to add comment'
            })
            // list comments reducer functions
            .addCase(listComments.fulfilled, (state, action) => {
                state.data = action.payload 
                state.status = 'succeed'
            })
            .addCase(listComments.pending, state => {
                state.status = 'pending'
            })
            .addCase(listComments.rejected, state => {
                state.status = 'failed'
                state.error = 'unable to list comment'
            })

            // like comments reducer functions 
            .addCase(likeComment.fulfilled, (state, action) => {
                state.data = action.payload 
                state.status = 'succeed'
            })
            .addCase(likeComment.pending, state => {
                state.status = 'pending'
            })
            .addCase(likeComment.rejected, state => {
                state.status = 'failed'
                state.error = 'unable to like comment'
            })

            // dislike comment reducer functions 
            .addCase(dislikeComment.fulfilled, (state, action) => {
                state.data = action.payload 
                state.status = 'succeed'
            })
            .addCase(dislikeComment.pending, state => {
                state.status = 'pending'
            })
            .addCase(dislikeComment.rejected, state => {
                state.status = 'failed'
                state.error = 'unable to dislike comment'
            })
    }
})

export const commentReducer = commentSlice.reducer 
export const addComment = createAsyncThunk('comments/addComment', async ({blog_id, post_id, data}) => {
    const response = await API.post(`/blogs/${blog_id}/posts/${post_id}/comments/new`, data)
    return response.data
})
export const listComments = createAsyncThunk('comments/listComments', async ({blog_id, post_id}) => {
    const response = await API.get(`/blogs/${blog_id}/posts/${post_id}/comments/all`)
    return response.data
})
export const likeComment = createAsyncThunk('comments/likeComment', async ({blog_id, post_id, comment_id}) => {
    const response = await API.get(`/blogs/${blog_id}/posts/${post_id}/comments/${comment_id}/like`)
    return response.data
})
export const dislikeComment = createAsyncThunk('comments/dislikeComment', async ({blog_id, post_id, comment_id}) => {
    const response = await API.get(`/blogs/${blog_id}/posts/${post_id}/comments/${comment_id}/dislike`)
    return response.data
})