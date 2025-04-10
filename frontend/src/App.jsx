import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Jobs from "./pages/Jobs"
import "./App.css"
import Browse from "./pages/Browse"
import Profile from "./pages/Profile"
import JobDetails from "./pages/JobDetails"
import NotFound from "./pages/NotFound"
import StudentLayout from "./layouts/StudentLayout"
import RecruiterLayout from "./layouts/RecruiterLayout"
import CreateJob from "./admin/CreateJob"
import CreateCompany from "./admin/CreateCompany"
import Companies from "./admin/Companies"
import AdminHome from "./admin/AdminHome"
import { useDispatch } from "react-redux"
import { setUser } from "./app/slices/authSlice"
import { toast } from "react-toastify"
import SetupCompany from "./admin/SetupCompany"
import AdminJobs from "./admin/AdminJobs"
import Applicants from "./admin/Applicants"


const App = () => {
 const dispatch = useDispatch()
  const handleLogout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/logout`);

      if (res.ok) {

        dispatch(setUser(null))
        toast.success("Logout successfull.")
      }
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<StudentLayout onLogout={handleLogout}/>}>
          <Route index element={<Home />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="job/:id" element={<JobDetails />} />
          <Route path="browse" element={<Browse />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/admin" element={<RecruiterLayout onLogout={handleLogout}/>}>

          <Route index element={<AdminHome />} />
          <Route path="companies" element={<Companies />} />
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="jobs/:id/applicants" element={<Applicants />} />
          <Route path="jobs/create" element={<CreateJob />} />
          <Route path="companies/create" element={<CreateCompany />} />
          <Route path="companies/setup/:id" element={<SetupCompany />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App