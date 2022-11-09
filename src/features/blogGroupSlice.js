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

      .addCase(blogGroupPrivateDetail.fulfilled, (state, action) => {
        state.data = action.payload 
        state.status = 'succeed'
      })
      .addCase(blogGroupPrivateDetail.pending, state => {
        state.status = 'pending'
      })
      .addCase(blogGroupPrivateDetail.rejected, state => {
        state.status = 'failed'
        state.error = 'unable to fetch group'
      })

      // assign permission to member
      .addCase(assignPermission.fulfilled, (state, action) => {
        state.data = action.payload 
        state.status = 'succeed'
      })
      .addCase(assignPermission.pending, state => {
        state.status = 'pending'
      })
      .addCase(assignPermission.rejected, state => {
        state.status = 'failed'
        state.error = 'unable to assign permission'
      })

      // remove permission 
      .addCase(removePermission.fulfilled, (state, action) => {
        state.data = action.payload 
        state.status = 'succeed'
      })
      .addCase(removePermission.pending, state => {
        state.status = 'pending'
      })
      .addCase(removePermission.rejected, state => {
        state.status = 'failed'
        state.error = 'unable to remove permission'
      })

      // fetch top 5 blogGroups action creators
      .addCase(topFiveBlogGroups.fulfilled, (state, action) => {
         state.data = action.payload 
         state.status = 'succeed'
      })
      .addCase(topFiveBlogGroups.pending, (state) => {
         state.status = 'pending'
      })
      .addCase(topFiveBlogGroups.rejected, (state) => {
          state.status = 'failed'
          state.error = 'unable to fetch top five groups'
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
export const topFiveBlogGroups = createAsyncThunk('blogGroups/topFiveBlogGroups', async () => {
  const response = await API.get('/blogs/top/five')
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

export const blogGroupPrivateDetail = createAsyncThunk('blogGroups/blogGroupPrivateDetail', async (blog_id) => {
    const response = await API.get(`/blogs/${blog_id}/private/detail`)
    return response.data
})
export const assignPermission = createAsyncThunk('blogGroups/assignPermission', async ({blog_id, user_id}) => {
    const response = await API.post(`/blogs/${blog_id}/private/assign/permission`, {user_id})
    return response.data
})
export const removePermission = createAsyncThunk('blogGroups/removePermission', async ({blog_id, user_id}) => {
  const response = await API.post(`/blogs/${blog_id}/private/remove/permission`, {user_id})
    return response.data
})