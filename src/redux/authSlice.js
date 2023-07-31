import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
  access:null,
  refresh:null,
  isAuthenticate:false,
  user:null
 }

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state,action) {
      state.access = action.payload.access 
      state.refresh = action.payload.refresh
      state.isAuthenticate = true
      state.user = action.payload.user 
      console.log("login success reducer")
      
    },
    loginFail(state,action) {
      console.log("login Fail reducer",state)
          
    },
    logout(state) {
            console.log("logout reducer");
            state.access = null,
            state.refresh = null,
            state.isAuthenticate = false,
            state.user = null 
    },
    updateUser(state,action){
      state.user = action.payload.user
    },
  },
})

export const { loginSuccess, loginFail, logout, updateUser } = authSlice.actions
export default authSlice.reducer