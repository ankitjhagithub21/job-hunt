import { Link, useNavigate } from "react-router-dom"
import { FaEye, FaEyeSlash, FaHome } from "react-icons/fa";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify"
import { signupSchema } from "../validator/login";

const Signup = () => {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const userData = Object.fromEntries(formData.entries());
    const result = signupSchema.safeParse(userData)
    if (result.success) {
      setErrors({})
      setLoading(true)

      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userData)
        })
        const data = await res.json();
        if (data.success) {
          toast.success(data.message);
          navigate("/login")
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
        console.log(error)
      } finally {
        dispatch(setLoading(false))
      }
    } else {
      setErrors(result.error.formErrors.fieldErrors)
    }

  }

  return (
    <section className="min-h-screen w-full flex items-center justify-center px-5 py-10">
      <div className="max-w-md w-full mx-auto custom-shadow p-8 rounded-xl ">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-2xl font-bold  text-gray-800">Signup</h1>
          <Link to={"/"} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
            <FaHome size={20} color="purple" />
          </Link>
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="text-gray-800 text-sm">Full Name</label>
            <input type="text" id="fullName" name="fullName" className="border focus:outline-none focus:ring-3 focus:ring-purple-500 rounded-xl border-gray-300 text-lg px-4 py-2" />
            {
              errors?.fullName && <span className="text-sm text-red-600">{errors.fullName[0]}</span>
            }
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-gray-800 text-sm">Email</label>
            <input type="text" id="email" name="email" className="border focus:outline-none focus:ring-3 focus:ring-purple-500 rounded-xl border-gray-300 text-lg px-4 py-2" />
            {
              errors?.email && <span className="text-sm text-red-600">{errors.email[0]}</span>
            }
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="text-gray-800 text-sm">Phone Number</label>
            <input type="text" id="phone" name="phone" className="border rounded-xl  focus:outline-none focus:ring-3 focus:ring-purple-500 border-gray-300 text-lg px-4 py-2" />
            {
              errors?.phone && <span className="text-sm text-red-600">{errors.phone[0]}</span>
            }
          </div>
          <div className="flex flex-col gap-1 mb-1">
            <label htmlFor="password" className="text-gray-800 text-sm">Password</label>
            <div className="border rounded-xl flex items-center focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500 border-gray-300 text-lg px-4 py-2">
              <input type={showPassword ? 'text' : 'password'} id="password" name="password" className="outline-none w-full bg-transparent" />
              <button className="cursor-pointer text-gray-800" type="button" onClick={() => setShowPassword(!showPassword)}>
                {
                  showPassword ? <FaEyeSlash /> : <FaEye />
                }
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
              loading ? 'Please wait...' : 'Signup'
            }
          </button>
        </form>
        <p className="mt-3 text-sm text-gray-800">Already have an account ? <Link className="text-purple-600 underline" to={"/login"}>Login</Link></p>
      </div>
    </section>
  )
}

export default Signup