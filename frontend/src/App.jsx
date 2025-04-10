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
import StudentLayout from "./routes/StudentLayout"


const App = () => {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<StudentLayout />}>
          <Route index element={<Home />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="job/:id" element={<JobDetails />} />
          <Route path="browse" element={<Browse />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        
        
       
        <Route path="/*" element={<NotFound />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App