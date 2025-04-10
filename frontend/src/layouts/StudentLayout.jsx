import { Navigate, Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useSelector } from "react-redux"


const StudentLayout = ({onLogout}) => {
  const { user } = useSelector(state => state.auth);

  if (user && user.role === "recruiter") {
    return <Navigate to={"/admin"} />
  }

  return (
    <>
      <Navbar onLogout={onLogout}/>
      <Outlet />
      <Footer />
    </>
  )
}

export default StudentLayout