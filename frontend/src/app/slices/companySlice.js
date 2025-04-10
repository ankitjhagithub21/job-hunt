import { createSlice } from '@reduxjs/toolkit'

export const companySlice = createSlice({
  name: 'company',
  initialState:{
    companies:[],
    
  },
  reducers: {
   
   
    setCompanies: (state, action) => {
      state.companies = action.payload
    },
  },
})

export const { setCompanies } = companySlice.actions

export default companySlice.reducer