import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCompanies } from '../app/slices/companySlice'

const useGetAllCompanies = () => {
  const dispatch = useDispatch()
    useEffect(() => {
        const getCompanyData = async() => {
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/companies`,{
                    credentials:'include'
                });
                const data = await res.json();
                dispatch(setCompanies(data))
            } catch (error) {
                    console.log(error)
            }
        }
        getCompanyData()
    }, [])
}

export default useGetAllCompanies