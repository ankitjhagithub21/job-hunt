
import { useSelector } from "react-redux"
import useGetAllCompanies from "../hooks/useGetAllCompanies"
import { Link, useNavigate } from "react-router-dom"


const Companies = () => {
  useGetAllCompanies()
  const navigate = useNavigate();

  const { companies } = useSelector(state => state.company)
  if (companies.length === 0) {
    return <p>No company found.</p>
  }
  return (
    <div className="h-full w-full p-5">
      <button className="btn btn-primary" onClick={()=>navigate("/")}>Back</button>
      <div className="overflow-x-scroll mt-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr>

              <th>Company</th>
              <th>Website</th>
              <th>Description</th>
              <th>Action</th>
              
            </tr>
          </thead>
          <tbody>
            {
              companies.map((company) => {
                return <tr key={company._id}>

                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={company.logo || "/logo.jpg"}
                            alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{company.name}</div>
                        <div className="text-sm opacity-50">{company.location}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                   <a href={company.website} target="_blank" className="text-primary underline">Website</a>
                   
                  </td>
                  <td>
                 <p>{company.description.slice(0,50)}...</p>
                   
                  </td>
                  <td>
                    <Link className="btn btn-primary" to={`/admin/companies/setup/${company._id}`}>Edit</Link>
                  </td>
                  
                </tr>
              })
            }

          </tbody>

        </table>
      </div>
    </div>
  )
}

export default Companies