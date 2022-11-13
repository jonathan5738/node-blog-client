import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' 
import API from '../api'
const accountSlice = createSlice({
    name: 'accounts',
    initialState: {
        data: {},
        error: null,
        status: null
    },
    reducers: {
      logoutUser: (state) => {
        state.data = {}
        localStorage.removeItem(process.env.REACT_APP_USER_PROFILE)
      }
    },
    extraReducers(builder){
        builder
          .addCase(signUser.fulfilled, (state, action) => {
            state.data = action.payload
            localStorage.setItem(process.env.REACT_APP_USER_PROFILE, JSON.stringify(action.payload))
            state.status = 'succeed'
          })
          .addCase(signUser.pending, (state) => {
             state.status = 'pending'
          })
          .addCase(signUser.rejected, state => {
              state.status = 'failed'
              state.error = 'unable to sign user in'
          })
          // login user reducer 
          .addCase(loginUser.fulfilled, (state, action) => {
            state.data = action.payload 
            localStorage.setItem(process.env.REACT_APP_USER_PROFILE, JSON.stringify(action.payload))
            state.status = 'succeed'
          })
          .addCase(loginUser.pending, state => {
             state.status = 'pending'
          })
          .addCase(loginUser.rejected, state => {
            state.status = 'failed'
            state.error = 'unable to login user'
         })
         // edit user reducers 
         .addCase(editUser.fulfilled, (state, action) => {
            state.data = action.payload 
            state.status = 'succeed'
          })
          .addCase(editUser.pending, state => {
             state.status = 'pending'
          })
          .addCase(editUser.rejected, state => {
            state.status = 'failed'
            state.error = 'unable to edit user'
         })
         // reset password reducer 
         .addCase(resetUserPassword.fulfilled, (state, action) => {
            state.data = action.payload 
            state.status = 'succeed'
          })
          .addCase(resetUserPassword.pending, state => {
             state.status = 'pending'
          })
          .addCase(resetUserPassword.rejected, state => {
            state.status = 'failed'
            state.error = 'unable to reset password'
         })
         // user profile fetch 
         .addCase(fetchProfile.fulfilled, (state, action) => {
            state.data = action.payload 
            state.status = 'succeed'
          })
          .addCase(fetchProfile.pending, state => {
             state.status = 'pending'
          })
          .addCase(fetchProfile.rejected, state => {
            state.status = 'failed'
            state.error = 'unable to fetch user profile'
         })
    }
})

export const accountReducer = accountSlice.reducer 
export const logoutUser = accountSlice.actions.logoutUser
export const signUser = createAsyncThunk('accounts/signUser', async (data) => {
    const response = await API.post('/accounts/signin', data)
    return response.data
})
export const loginUser = createAsyncThunk('accounts/loginUser', async (data) => {
    const response = await API.post('/accounts/login', data)
    return response.data
})
export const editUser = createAsyncThunk('accounts/editUser', async (data) => {
    const response = await API.patch('/accounts/edit', data)
    return response.data
})
export const resetUserPassword = createAsyncThunk('accounts/resetUserPassword', async (data) => {
    const response = await API.patch('/accounts/reset/password', data)
    return response.data
})
export const fetchProfile = createAsyncThunk('accounts/fetchProfile', async () => {
    const response = await API.get('/accounts/profile')
    return response.data
})