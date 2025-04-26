import { Link, useNavigate } from "react-router-dom"
import { FaEye, FaEyeSlash, FaHome } from "react-icons/fa";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../app/slices/authSlice";
import { toast } from "react-toastify"
import { loginSchema } from "../validator/login";

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const userData = Object.fromEntries(formData.entries());

    const result = loginSchema.safeParse(userData)
    if (result.success) {
      setErrors({})
      setLoading(true)

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
        toast.error("Login failed ! Please try again later.")
        console.log(error)
      } finally {
        setLoading(false)
      }
    } else {

      setErrors(result.error.formErrors.fieldErrors)
    }
  }

  return (
    <section className="h-screen w-full flex items-center justify-center p-5">
      <div className="max-w-md w-full  mx-auto custom-shadow p-8 rounded-xl ">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-2xl font-bold  text-gray-800">Login</h1>
          <Link to={"/"} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
            <FaHome size={20} color="purple" />
          </Link>
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-gray-800 text-sm">Email</label>
            <input type="text" id="email" name="email" className="border rounded-xl border-gray-300 text-lg focus:outline-none focus:ring-3 focus:ring-purple-500 px-4 py-2" />
            {
              errors?.email && <span className="text-sm text-red-600">{errors.email[0]}</span>
            }
          </div>

          <div className="flex flex-col gap-1 mb-1">
            <label htmlFor="password" className="text-gray-800 text-sm">Password</label>
            <div className="border focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500 rounded-xl flex items-center border-gray-300 text-lg px-4 py-2">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="outline-none w-full bg-transparent"

              />
              <button
                className="cursor-pointer text-gray-800"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {
              errors?.password && <span className="text-sm text-red-600">{errors.password[0]}</span>
            }
          </div>


          <div className="flex flex-col gap-1">
            <label htmlFor="role" className="text-gray-800 text-sm">Role</label>
            <div className="flex  gap-10 items-center">
              <div className="flex items-center gap-1">
                <input type="radio" id="student" name="role" value="student" />
                <label htmlFor="student" className="cursor-pointer">Student</label>
              </div>
              <div className="flex items-center gap-1">
                <input type="radio" id="recruiter" name="role" value="recruiter" />
                <label htmlFor="recruiter" className="cursor-pointer">Recruiter</label>
              </div>
            </div>
            {
              errors?.role && <span className="text-sm text-red-600">{errors.role[0]}</span>
            }
          </div>
          <button disabled={loading} type="submit" className="p-2 bg-purple-600 rounded-xl text-white cursor-pointer hover:bg-purple-700">
            {
              loading ? 'Please wait...' : 'Login'
            }
          </button>
        </form>
        <p className="mt-3 text-sm text-gray-800">Don't have an account ? <Link className="text-purple-600 underline" to={"/signup"}>Signup</Link></p>
      </div>
    </section>
  )
}

export default Login