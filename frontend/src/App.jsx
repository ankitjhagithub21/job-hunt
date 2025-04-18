import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./app/slices/authSlice";
import { toast } from "react-toastify";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import "./App.css";
import LoadingPage from "./pages/LoadingPage";

// Lazy-loaded components
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Jobs = lazy(() => import("./pages/Jobs"));
const Browse = lazy(() => import("./pages/Browse"));
const Profile = lazy(() => import("./pages/Profile"));
const JobDetails = lazy(() => import("./pages/JobDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));
const StudentLayout = lazy(() => import("./layouts/StudentLayout"));
const RecruiterLayout = lazy(() => import("./layouts/RecruiterLayout"));
const CreateJob = lazy(() => import("./admin/CreateJob"));
const CreateCompany = lazy(() => import("./admin/CreateCompany"));
const Companies = lazy(() => import("./admin/Companies"));
const AdminHome = lazy(() => import("./admin/AdminHome"));
const SetupCompany = lazy(() => import("./admin/SetupCompany"));
const AdminJobs = lazy(() => import("./admin/AdminJobs"));
const Applicants = lazy(() => import("./admin/Applicants"));



const App = () => {
  useGetCurrentUser()
  const dispatch = useDispatch()
  
  const handleLogout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/logout`, {
        credentials: 'include'
      });

      if (res.ok) {

        dispatch(setUser(null))
        toast.success("Logout successfull.")
      }

    } catch (error) {
      console.log(error)
    }

  }
  return (
    <Suspense fallback={<LoadingPage />}>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<StudentLayout onLogout={handleLogout} />}>
            <Route index element={<Home />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="job/:id" element={<JobDetails />} />
            <Route path="browse" element={<Browse />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="/admin" element={<RecruiterLayout onLogout={handleLogout} />}>

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
    </Suspense>
  )
}

export default App