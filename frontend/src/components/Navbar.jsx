import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { CiUser,CiLogout } from "react-icons/ci"


const Navbar = ({onLogout}) => {
    const {user} = useSelector(state=>state.auth)
    const [isOpen,setIsOpen] = useState(false)
  
    return (
        <header className="custom-shadow z-50 text-gray-800 sticky top-0 px-3 bg-white">
            <div className="max-w-7xl w-full mx-auto py-3 flex items-center justify-between">
                <Link to={"/"} className="flex items-center gap-2">
                    <img src="/logo.jpg" alt="logo" className="w-8 h-8 rounded-lg" />
                    <h2 to={"/"} className="text-2xl font-bold">Job<span className="text-purple-800">Hunt</span> </h2>
                </Link>
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
                        isOpen ?   <div className="absolute flex flex-col items-start gap-2 custom-shadow rounded-xl top-10 bg-white w-44 px-2 py-4 right-3">
                        <Link to={"/profile"} className="flex gap-2 w-full p-2 rounded-lg hover:bg-gray-100 items-center">
                        <CiUser size={20}/>
                        View Profile
                        </Link>
                        <button  onClick={onLogout} className="flex gap-2 w-full p-2 rounded-lg items-center bg-gray-100 hover:bg-gray-200">
                            <CiLogout size={20}/>
                            Logout
                            </button>
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