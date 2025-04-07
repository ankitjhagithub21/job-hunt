import { useSelector } from "react-redux"
import { Link } from "react-router-dom"


const Navbar = () => {
    const {user} = useSelector(state=>state.auth)
    return (
        <header className="custom-shadow sticky top-0 px-3 bg-white">
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
                    user ? <div className="relative">
                        <img src={user.profile.profilePhoto} alt="profile" className="w-10 h-10 rounded-full object-cover"/>
                    </div> :  <Link to={"/login"} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer">Login</Link>
                }
               </nav>
            </div>
        </header>
    )
}

export default Navbar