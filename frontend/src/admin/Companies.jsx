
import { useSelector } from "react-redux"
import useGetAllCompanies from "../hooks/useGetAllCompanies"
import { Link, useNavigate } from "react-router-dom"
import { format } from "date-fns"
import { useEffect, useState } from "react"


const Companies = () => {
  useGetAllCompanies()
  const navigate = useNavigate();
 
  const { companies } = useSelector(state => state.company)

  console.log(companies)
  
  const [filteredCompanies, setFilteredCompanies] = useState(companies)
  const [searchTerm, setSearchTerm] = useState('')
  
  useEffect(() => {
    setFilteredCompanies(companies.filter((company)=>company.name.toLowerCase().includes(searchTerm)))
  }, [searchTerm])

 
  return (
    <div className="h-full w-full p-5">
      <div className="flex items-center justify-between gap-2">
        <label className="input input-primary">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
          <input type="search" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className="grow" placeholder="Search" />
         
        </label>

        <button className="btn btn-primary" onClick={() => navigate("/")}>Back</button>
      </div>
      <div className="overflow-x-auto mt-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr>

              <th>Company</th>
              <th>Website</th>
              <th>Date</th>
              <th>Action</th>

            </tr>
          </thead>
          
            {
              filteredCompanies.length===0 ? <>No Company found.</> : <tbody>
                {
                  filteredCompanies.map((company) => {
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
                        <p>{format(company.createdAt, 'MM/dd/yyyy')}</p>
    
                      </td>
                      <td>
                        <Link className="btn btn-primary" to={`/admin/companies/setup/${company._id}`}>Edit</Link>
                      </td>
    
                    </tr>
                  })
                }
              </tbody>
            }

          

        </table>
      </div>
    </div>
  )
}

export default Companies