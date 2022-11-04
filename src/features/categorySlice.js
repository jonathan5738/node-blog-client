import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' 
import API from '../api'
const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        data: [],
        error: null,
        status: null
    },
    extraReducers(builder){
        builder
          .addCase(fetchCategories.fulfilled, (state, action) => {
            state.data = action.payload 
            state.status = 'succeed'
          })
          .addCase(fetchCategories.pending, state => {
             state.status = 'pending'
          })
          .addCase(fetchCategories.rejected, state => {
            state.status = 'failed'
            state.error = 'unable to fetch categories'
          })
    }
})
export const categoryReducer = categorySlice.reducer 
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const response = await API.get('/categories/all')
    return response.data
})

