import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setAllJobs } from "../app/slices/jobSlice";


const useGetAllJobs = () => {
    const dispatch = useDispatch();
   useEffect(()=>{
    const fetchAllJobs = async() => {
        try{
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/jobs`)
            const data = await res.json();
            if(res.ok){
                dispatch(setAllJobs(data))
            }
        }catch(error){
            console.log(error)
        }
    }
    fetchAllJobs()
   },[])
}

export default useGetAllJobs