import { useSelector } from "react-redux";
import { Link, Navigate, Outlet } from "react-router-dom"


const RecruiterLayout = ({ onLogout }) => {
  const { user } = useSelector(state => state.auth);

  if (!user || user.role !== "recruiter") {
    return <Navigate to={"/"} />
  }
  return (
    <main className="h-screen w-full relative overflow-hidden">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center p-5">
          <Outlet />
          {/* Page content here */}
          {/* <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
      Open drawer
    </label> */}
        </div>

        <div className="drawer-side">

          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full flex flex-col  justify-between w-80 p-4">
            {/* Sidebar content here */}
            <div className="flex flex-col gap-10">
              <Link to={"/"} className="flex items-center gap-2">
                <img src="/logo.jpg" alt="logo" className="w-8 h-8 rounded-lg" />
                <h2 to={"/"} className="text-2xl font-bold">Job<span className="text-purple-800">Hunt</span> </h2>
              </Link>
              <nav>
                <li><Link to={""}>Home</Link></li>
                <li><Link to={"companies"}>Companies</Link></li>
                <li><Link to={"jobs/create"}>Post Job</Link></li>
                <li><Link to={"companies/create"}>New company</Link></li>
              </nav>
            </div>
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
                <img src={user.profile.profilePhoto} />
              </div>
            </div>
          </ul>

        </div>

      </div>

    </main>
  )
}

export default RecruiterLayout