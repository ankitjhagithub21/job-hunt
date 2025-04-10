import { createSlice } from '@reduxjs/toolkit'

export const jobSlice = createSlice({
  name: 'job',
  initialState:{
    allJobs:[],
    jobs:[]
  },
  reducers: {
   
   
    setAllJobs: (state, action) => {
      state.allJobs = action.payload
    },
    setJobs: (state, action) => {
      state.jobs = action.payload
    },
  },
})

export const { setJobs ,setAllJobs} = jobSlice.actions

export default jobSlice.reducer