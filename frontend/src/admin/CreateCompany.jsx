import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const CreateCompany = () => {
  const [name, setName] = useState('')

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/companies/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({ name })
      })
      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        navigate(`/admin/companies/setup/${data.company._id}`)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }
  return (

    <div className="custom-shadow mx-auto my-10 md:w-[400px] w-full rounded-xl p-5">
      <h1 className="text-3xl font-medium mb-5">Register Company</h1>
      <form onSubmit={handleSubmit} className="w-full">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Enter company name</legend>
          <input type="text" className="input input-primary w-full" value={name} onChange={(e) => setName(e.target.value)} placeholder="Type here" />

        </fieldset>
        <button className="btn btn-primary mt-2">Submit</button>
      </form>
    </div>

  )
}

export default CreateCompany