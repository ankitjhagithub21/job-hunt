
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setJobs } from '../app/slices/jobSlice'

const useGetAdminJobs = () => {
    const dispatch = useDispatch()
   
    useEffect(()=>{
     const getAdminJobs = async() => {
         try{
             const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/jobs/admin`,{
                 credentials:'include'
             })
             const data = await res.json();
             dispatch(setJobs(data))
         }catch(error){
             console.log(error)
         }
     }
     getAdminJobs()
    },[])
}

export default useGetAdminJobs