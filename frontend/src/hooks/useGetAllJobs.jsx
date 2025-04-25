import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setAllJobs, setIsLoading } from "../app/slices/jobSlice";


const useGetAllJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllJobs = async () => {
            dispatch(setIsLoading(true))
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/jobs`)
                const data = await res.json();
                if (res.ok) {
                    dispatch(setAllJobs(data))
                }
            } catch (error) {
                console.log(error)
            } finally {
                dispatch(setIsLoading(false))
            }
        }
        fetchAllJobs()
    }, [])
}

export default useGetAllJobs