import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { setUser } from "../app/slices/authSlice"


const Navbar = () => {
    const {user} = useSelector(state=>state.auth)
    const [isOpen,setIsOpen] = useState(false)
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(setUser(null))
    }
    return (
        <header className="custom-shadow z-50 text-gray-800 sticky top-0 px-3 bg-white">
            <div className="max-w-7xl w-full mx-auto py-3 flex items-center justify-between">
                <div>
                    <Link to={"/"} className="text-2xl font-bold">Job<span className="text-purple-800">Hunt</span> </Link>
                </div>
               <nav className="flex items-center gap-5">
                 <ul className="flex items-center gap-5">
                    <li>
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li>
                        <Link to={"/jobs"}>Jobs</Link>
                    </li>
                    <li>
                    <Link to={"/browse"}>Browse</Link>
                    </li>
                 </ul>
                {
                    user ? <div className="relative cursor-pointer border-2 rounded-full border-gray-200 " onClick={()=>setIsOpen(!isOpen)}>
                        <img src={user.profile.profilePhoto} alt="profile" className="w-10 h-10 rounded-full object-cover"/>
                      {
                        isOpen ?   <div className="absolute flex flex-col items-start gap-2 custom-shadow rounded-xl top-10 bg-white w-44 p-5 right-3">
                        <Link to={"/profile"}>Your Profile</Link>
                        <button  onClick={handleLogout}>Logout</button>
                    </div> : ''
                      }
                    </div> :  <Link to={"/login"} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer">Login</Link>
                }
               </nav>
            </div>
        </header>
    )
}

export default Navbar