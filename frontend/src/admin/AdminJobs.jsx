import { useSelector } from "react-redux"
import useGetAdminJobs from "../hooks/useGetAdminJobs"
import { Link } from "react-router-dom"



const AdminJobs = () => {
  useGetAdminJobs()
  
  const {jobs} = useSelector((state)=>state.job)
  console.log(jobs)
   
 if(!jobs){
  return <p>Job not found.</p>
 }
 
  return (
    <div className="h-full w-full p-5">
     
      <div className="overflow-x-auto mt-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr>

              <th>Company</th>
              <th>Role</th>
              <th>Date</th>
              <th>Applicants</th>

            </tr>
          </thead>
          
            <tbody>
                {
                    jobs.map((job)=>{
                        return <tr key={job._id}>
                            <td>{job.company.name}</td>
                            <td>{job.title}</td>
                            <td>{job.createdAt.slice(0,10)}</td>
                            <td>
                                <Link to={`/admin/jobs/${job._id}/applicants`} className="btn btn-primary" >Applicants</Link>
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

export default AdminJobs