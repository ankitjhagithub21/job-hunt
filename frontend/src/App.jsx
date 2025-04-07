import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Navbar from "./components/Navbar"
import "./App.css"
import Jobs from "./pages/Jobs"

const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/jobs" element={<Jobs/>}/>
      </Routes>
     
    </BrowserRouter>
  )
}

export default App