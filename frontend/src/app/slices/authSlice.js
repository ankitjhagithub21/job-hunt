import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState:{
    isLoading:true,
    user:null
  },
  reducers: {
   
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
})

export const { setIsLoading,setUser } = authSlice.actions

export default authSlice.reducer