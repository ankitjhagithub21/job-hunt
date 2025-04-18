
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser,setIsLoading } from '../app/slices/authSlice'


const useGetCurrentUser = () => {
    const dispatch = useDispatch()
   
    useEffect(()=>{
     const getUser = async() => {
         try{
             const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/auth`,{
                 credentials:'include'
             })
             const data = await res.json();
            if(data.success){
                dispatch(setUser(data.user))
            }else{
                dispatch(setUser(null))
            }
         }catch(error){
             dispatch(setUser(null))
         }finally{
            dispatch(setIsLoading(false))
         }
     }
     getUser()
    },[])
}

export default useGetCurrentUser