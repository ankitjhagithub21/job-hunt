import { createSlice } from '@reduxjs/toolkit'

export const jobSlice = createSlice({
  name: 'job',
  initialState:{
    allJobs:[],
    jobs:[],
    isLoading:true
    
  },
  reducers: {
   
   
    setAllJobs: (state, action) => {
      state.allJobs = action.payload
    },
    setJobs: (state, action) => {
      state.jobs = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
})

export const { setJobs ,setAllJobs,setIsLoading} = jobSlice.actions

export default jobSlice.reducer