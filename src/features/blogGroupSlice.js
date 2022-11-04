import { createSlice,  createAsyncThunk } from "@reduxjs/toolkit"; 
import API from "../api";
const blogGroupSlice = createSlice({
    name: 'blogGroups',
    initialState: {
        data: [],
        error: null,
        status: null
    },
    extraReducers(builder){
        builder
          .addCase(listBlogGroups.fulfilled, (state, action) => {
             state.data = action.payload 
             state.status = 'succeed'
          })
          .addCase(listBlogGroups.pending, state => {
            state.status = 'pending'
          })
          .addCase(listBlogGroups.rejected, state => {
            state.status = 'failed'
            state.error = 'unable to fetch blog groups'
          })

          // create blog group reducer functions 
          .addCase(createBlogGroup.fulfilled, (state, action) => {
            state.data = action.payload 
            state.status = 'succeed'
         })
         .addCase(createBlogGroup.pending, state => {
           state.status = 'pending'
         })
         .addCase(createBlogGroup.rejected, state => {
           state.status = 'failed'
           state.error = 'unable to create blog group'
         })

         // blog group detail reducer functions 
         .addCase(blogGroupDetail.fulfilled, (state, action) => {
            state.data = action.payload 
            state.status = 'succeed'
         })
         .addCase(blogGroupDetail.pending, state => {
           state.status = 'pending'
         })
         .addCase(blogGroupDetail.rejected, state => {
           state.status = 'failed'
           state.error = 'unable to fetch blog group'
         })
         // edit blog group reducer functions
         .addCase(editBlogGroup.fulfilled, (state, action) => {
            state.data = action.payload 
            state.status = 'succeed'
         })
         .addCase(editBlogGroup.pending, state => {
           state.status = 'pending'
         })
         .addCase(editBlogGroup.rejected, state => {
           state.status = 'failed'
           state.error = 'unable to edit blog group'
         })

         // delete blog group reducer functions 
         .addCase(deleteBlogGroup.fulfilled, (state, action) => {
            state.data = action.payload 
            state.status = 'succeed'
         })
         .addCase(deleteBlogGroup.pending, state => {
           state.status = 'pending'
         })
         .addCase(deleteBlogGroup.rejected, state => {
           state.status = 'failed'
           state.error = 'unable to delete blog group'
         })

         // fetch group created by user 
         .addCase(listBlogGroupPrivate.fulfilled, (state, action) => {
            state.data = action.payload 
            state.status = 'succeed'
         })
         .addCase(listBlogGroupPrivate.pending, state => {
           state.status = 'pending'
         })
         .addCase(listBlogGroupPrivate.rejected, state => {
           state.status = 'failed'
           state.error = 'unable to delete blog group'
         })
        

       .addCase(joinBlogGroup.fulfilled, (state, action) => {
          state.data = action.payload 
          state.status = 'succeed'
       })
       .addCase(joinBlogGroup.pending, state => {
         state.status = 'pending'
       })
       .addCase(joinBlogGroup.rejected, state => {
         state.status = 'failed'
         state.error = 'unable to join this group'
       })

       .addCase(searchListBlogGroups.fulfilled, (state, action) => {
        state.data = action.payload 
        state.status = 'succeed'
      })
      .addCase(searchListBlogGroups.pending, state => {
        state.status = 'pending'
      })
      .addCase(searchListBlogGroups.rejected, state => {
        state.status = 'failed'
        state.error = 'unable to fetch groups'
      })
    }
})
export const blogGroupReducer = blogGroupSlice.reducer 
export const listBlogGroups = createAsyncThunk('blogGroups/listBlogGroups', async (category_name=null) => {
    const response = await API.get(`/blogs/all?category_name=${category_name}`)
    return response.data
})
export const createBlogGroup = createAsyncThunk('blogGroups/createBlogGroup', async (data) => {
    const response = await API.post('/blogs/new', data)
    return response.data
})
export const blogGroupDetail = createAsyncThunk('blogGroups/blogGroupDetail', async (blog_id) =>{
    const response = await API.get(`/blogs/${blog_id}/detail`)
    return response.data
})
export const listBlogGroupPrivate = createAsyncThunk('blogGroups/listBlogGroupPrivate', async () => {
    const response = await API.get('/blogs/private/all')
    return response.data
})
export const editBlogGroup = createAsyncThunk('blogGroups/editBlogGroup', async({blog_id, data}) => {
    const response = await API.post(`/blogs/${blog_id}/edit`, data)
    return response.data
})
export const deleteBlogGroup = createAsyncThunk('blogGroups/deleteBlogGroup', async (blog_id) => {
    const response = await API.delete(`/blogs/${blog_id}/delete`)
    return response.data
})
export const joinBlogGroup = createAsyncThunk('blogGroups/joinBlogGroup', async (data) => {
  const response = await API.post('/blogs/join', data)
  return response.data
})
export const searchListBlogGroups = createAsyncThunk('blogGroups/searchListBlogGroups', async (data) => {
  const response = await API.post('/blogs/all/search', data)
  return response.data
})