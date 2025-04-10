import { Link, useNavigate } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, setUser } from "../app/slices/authSlice";
import { toast } from "react-toastify"

const Login = () => {
  const { isLoading } = useSelector(state => state.auth)
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const userData = Object.fromEntries(formData.entries());
    dispatch(setIsLoading(true))

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(userData)
      })
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        dispatch(setUser(data.user))
        navigate("/")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  return (
    <section className="h-screen w-full flex items-center justify-center p-5">
      <div className="max-w-xl  mx-auto custom-shadow p-8 rounded-xl ">
        <h1 className="text-2xl font-bold  mb-3 text-gray-800">Login</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-gray-800 text-sm">Email</label>
            <input type="email" id="email" name="email" className="border rounded-xl border-gray-300 text-lg focus:outline-none focus:ring-3 focus:ring-purple-500 px-4 py-2" required />
          </div>

          <div className="flex flex-col gap-1 mb-1">
            <label htmlFor="password" className="text-gray-800 text-sm">Password</label>
            <div className="border focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500 rounded-xl flex items-center border-gray-300 text-lg px-4 py-2">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="outline-none w-full bg-transparent"
                required
              />
              <button
                className="cursor-pointer text-gray-800"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>


          <div className="flex flex-col gap-1">
            <label htmlFor="role" className="text-gray-800 text-sm">Role</label>
            <div className="flex  gap-10 items-center">
              <div className="flex items-center gap-1">
                <input type="radio" id="student" name="role" value="student" required />
                <label htmlFor="student" className="cursor-pointer">Student</label>
              </div>
              <div className="flex items-center gap-1">
                <input type="radio" id="recruiter" name="role" value="recruiter" required />
                <label htmlFor="recruiter" className="cursor-pointer">Recruiter</label>
              </div>
            </div>
          </div>
          <button disabled={isLoading} type="submit" className="p-2 bg-purple-600 rounded-xl text-white cursor-pointer hover:bg-purple-700">
            {
              isLoading ? 'Please wait...' : 'Login'
            }
          </button>
        </form>
        <p className="mt-3 text-sm text-gray-800">Don't have an account ? <Link className="text-purple-600 underline" to={"/signup"}>Signup</Link></p>
      </div>
    </section>
  )
}

export default Login