import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import jobReducer from './slices/jobSlice'
import companyReducer from './slices/companySlice'

export default configureStore({
  reducer: {
     auth:authReducer,
     job:jobReducer,
     company:companyReducer
  },
})



