import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' 
import API from '../api'
const postSlice = createSlice({
    name: 'posts',
    initialState: {
        data: [],
        error: null,
        status: null
    },
    extraReducers(builder){
        builder
           .addCase(createPost.fulfilled, (state, action) => {
              state.data = action.payload 
              state.status = 'succeed'
           })
           .addCase(createPost.pending, (state) => {
              state.status = 'pending'
           })
           .addCase(createPost.rejected, state => {
               state.status = 'failed'
               state.error = 'unable to create post'
           })
           // list post reducer functions
         .addCase(listPosts.fulfilled, (state, action) => {
            state.data = action.payload 
            state.status = 'succeed'
         })
         .addCase(listPosts.pending, (state) => {
            state.status = 'pending'
         })
         .addCase(listPosts.rejected, state => {
             state.status = 'failed'
             state.error = 'unable to fetch posts'
         })

         // edit post reducer functions
         .addCase(editPost.fulfilled, (state, action) => {
            state.data = action.payload 
            state.status = 'succeed'
         })
         .addCase(editPost.pending, (state) => {
            state.status = 'pending'
         })
         .addCase(editPost.rejected, state => {
             state.status = 'failed'
             state.error = 'unable to edit post'
         })
         // delete post reducer functions
         .addCase(deletePost.fulfilled, (state, action) => {
            state.data = action.payload 
            state.status = 'succeed'
         })
         .addCase(deletePost.pending, (state) => {
            state.status = 'pending'
         })
         .addCase(deletePost.rejected, state => {
             state.status = 'failed'
             state.error = 'unable to delete post'
         })
         // add paragraph reducer functions
         .addCase(addParagraph.fulfilled, (state, action) => {
            state.data = action.payload 
            state.status = 'succeed'
         })
         .addCase(addParagraph.pending, (state) => {
            state.status = 'pending'
         })
         .addCase(addParagraph.rejected, state => {
             state.status = 'failed'
             state.error = 'unable to add paragraph'
         })

         // edit paragraph reducer functions
         .addCase(editParagraph.fulfilled, (state, action) => {
            state.data = action.payload 
            state.status = 'succeed'
         })
         .addCase(editParagraph.pending, (state) => {
            state.status = 'pending'
         })
         .addCase(editParagraph.rejected, state => {
             state.status = 'failed'
             state.error = 'unable to edit paragraph'
         })

         // delete paragraph reducer functions
         .addCase(deleteParagraph.fulfilled, (state, action) => {
            state.data = action.payload 
            state.status = 'succeed'
         })
         .addCase(deleteParagraph.pending, (state) => {
            state.status = 'pending'
         })
         .addCase(deleteParagraph.rejected, state => {
             state.status = 'failed'
             state.error = 'unable to delete paragraph'
         })

         /// post detail private reducer function 
         .addCase(postDetailPrivate.fulfilled, (state, action) => {
            state.data = action.payload 
            state.status = 'succeed'
         })
         .addCase(postDetailPrivate.pending, (state) => {
            state.status = 'pending'
         })
         .addCase(postDetailPrivate.rejected, state => {
             state.status = 'failed'
             state.error = 'unable to fetch post'
         })

         .addCase(listPostPrivate.fulfilled, (state, action) => {
            state.data = action.payload 
            state.status = 'succeed'
         })
         .addCase(listPostPrivate.pending, (state) => {
            state.status = 'pending'
         })
         .addCase(listPostPrivate.rejected, state => {
             state.status = 'failed'
             state.error = 'unable to fetch posts'
         })

         .addCase(postDetail.fulfilled, (state, action) => {
            state.data = action.payload 
            state.status = 'succeed'
         })
         .addCase(postDetail.pending, state => {
            state.status = 'pending'
         })
         .addCase(postDetail.rejected, state => {
            state.status = 'failed'
            state.error = 'unable to fetch post'
        })


        .addCase(likePost.fulfilled, (state, action) => {
            state.data = action.payload 
            state.status = 'succeed'
         })
         .addCase(likePost.pending, state => {
            state.status = 'pending'
         })
         .addCase(likePost.rejected, state => {
            state.status = 'failed'
            state.error = 'unable to like post'
        })

        .addCase(dislikePost.fulfilled, (state, action) => {
            state.data = action.payload 
            state.status = 'succeed'
         })
         .addCase(dislikePost.pending, state => {
            state.status = 'pending'
         })
         .addCase(dislikePost.rejected, state => {
            state.status = 'failed'
            state.error = 'unable to dislike post'
        })

        // all posts reducer functions
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.data = action.payload 
        state.status = 'succeed'
      })
      .addCase(fetchAllPosts.pending, (state) => {
          state.status = 'pending'
      })
      .addCase(fetchAllPosts.rejected, (state) => {
          state.status = 'failed'
          state.error = 'unable to fetch all posts'
      })
    }
})
export const postReducer = postSlice.reducer 
export const createPost = createAsyncThunk('posts/createPost', async({blog_id, data}) => {
    const response = await API.post(`/blogs/${blog_id}/posts/new`, data)
    return response.data
})
export const listPosts = createAsyncThunk('posts/listPosts', async(blog_id) => {
    const response = await API.get(`/blogs/${blog_id}/posts/all`)
    return response.data
})
export const editPost = createAsyncThunk('posts/editPost', async ({blog_id, post_id, data}) => {
    const response = await API.patch(`/blogs/${blog_id}/posts/${post_id}/edit`, data)
    return response.data
})
export const deletePost = createAsyncThunk('posts/deletePost', async ({blog_id, post_id}) => {
    const response = await API.patch(`/blogs/${blog_id}/posts/${post_id}/delete`)
    return response.data
})

export const likePost = createAsyncThunk('posts/likePost', async ({blog_id, post_id}) => {
    const response = await API.get(`/blogs/${blog_id}/posts/${post_id}/like`)
    return response.data
})

export const fetchAllPosts = createAsyncThunk('posts/fetchAllPosts', async () => {
    const response = await API.get('/blogs/all/posts')
    return response.data
  })

export const dislikePost = createAsyncThunk('posts/dislikePost', async ({blog_id, post_id}) => {
    const response = await API.get(`/blogs/${blog_id}/posts/${post_id}/dislike`)
    return response.data
})

export const addParagraph = createAsyncThunk('posts/addParagraph', async ({blog_id, post_id, data}) => {
    const response = await API.post(`/blogs/${blog_id}/posts/${post_id}/paragraph/add`, data)
    return response.data
})
export const editParagraph = createAsyncThunk('posts/editParagraph', async ({blog_id, post_id, data}) => {
    const response = await API.patch(`/blogs/${blog_id}/posts/${post_id}/paragraph/edit`, data)
    return response.data
})

export const deleteParagraph = createAsyncThunk('posts/deleteParagraph', async ({blog_id, post_id}) => {
    const response = await API.delete(`/blogs/${blog_id}/posts/${post_id}/paragraph/delete`)
    return response.data
})
export const postDetailPrivate = createAsyncThunk('posts/postDetailPrivate', async ({blog_id, post_id}) => {
    const response = await API.get(`/blogs/${blog_id}/posts/${post_id}/private/detail`)
    return response.data
})
export const listPostPrivate = createAsyncThunk('posts/listPostPrivate', async (blog_id) => {
    const response = await API.get(`/blogs/${blog_id}/posts/private/all`)
    return response.data
})
export const postDetail = createAsyncThunk('posts/postDetail', async ({blog_id, post_id}) => {
    const response = await API.get(`/blogs/${blog_id}/posts/${post_id}/detail`)
    return response.data
})