
import { CiMail, CiPhone } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import UpdateProfile from "../components/UpdateProfile";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
const Profile = () => {
  const user = useSelector(state => state.auth.user)
  const [isOpen, setIsOpen] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState([])

  useEffect(() => {
    const getAppliedJobs = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/applications/applied`, {
          credentials: 'include'
        });
        const data = await res.json();
        setAppliedJobs(data)
      } catch (error) {
        console.log(error)
      }
    }
    getAppliedJobs()
  }, [])

  if (!user) {
    return <Navigate to={"/"}/>
  }

  return (
    <section className=" relative min-h-screen w-full  px-5">
      {
        user && isOpen && <UpdateProfile setIsOpen={setIsOpen} user={user} />
      }
      <div className="max-w-3xl relative mx-auto">
        <FaEdit onClick={() => setIsOpen(true)} size={20} cursor={"pointer"} className="absolute text-gray-700 text-xl top-5 right-5 rounded-lg " />
        <div className=" p-5 border my-10 rounded-lg border-gray-200 w-full">
          <div className="flex md:flex-row flex-col items-center gap-5">
            <div>
              <img src={user.profile.profilePhoto} alt="profile" className=" w-28 border-2 border-gray-200 rounded-full object-cover" />
            </div>
            <div className="flex-1 text-center md:text-start">
              <h2 className="text-3xl mb-2 font-bold text-gray-900">{user.fullName}</h2>
              <p className="text-sm text-gray-800">{user.profile.bio || "No bio found."}</p>
            </div>
          </div>
          <div className="flex gap-2 items-center p-5">
            <CiMail size={25} />
            <span>{user.email}</span>
          </div>
          <div className="flex gap-2 items-center px-5">
            <CiPhone size={25} />
            <span>{user.phone}</span>
          </div>
          <h2 className="p-5 text-2xl">Skills</h2>
          <div className="flex flex-wrap gap-3 px-5">
            {
              user.profile.skills.length === 0 ? <p className="text-gray-800">You have not added any skills.</p> :
                user.profile.skills.map((skill, index) => {
                  return <span key={index} className="bg-gray-900 text-white rounded-full px-4 py-1 text-sm">{skill}</span>
                })
            }
          </div>
          <h2 className="px-5 pt-5 pb-2 text-2xl">Resume</h2>
          {
            user.profile?.resume ? <a href={user.profile.resume} className="text-blue-600 hover:underline  px-5" target="_blank">{user.fullName}</a> : <p className="text-gray-800 px-5">Resume not found.</p>
          }
        </div>


        <div className="mb-10">

          <h1 className="text-2xl  font-medium title-font mb-5 text-gray-900">
            Applied Jobs
          </h1>

          <div className=" w-full mx-auto overflow-auto">
            <table className="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                    Date
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Job Role
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Company
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Status
                  </th>

                </tr>
              </thead>
              <tbody>
               {
                appliedJobs.map((ap)=>{
                  return  <tr key={ap._id}>
                  <td className="px-4 py-3">{ap.createdAt.slice(0,10)}</td>
                  <td className="px-4 py-3">{ap.job.title}</td>
                  <td className="px-4 py-3">{ap.job.company.name}</td>
                  <td className="px-4 py-3">
                    <span className="text-sm bg-gray-800 text-white rounded-full px-3 py-0.5">{ap.status}</span>
                  </td>

                </tr>
                })
               }
               
              </tbody>
            </table>
          </div>


        </div>
      </div>
    </section>
  )
}

export default Profile