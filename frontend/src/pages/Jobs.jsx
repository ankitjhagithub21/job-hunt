
import { useSelector } from 'react-redux'
import JobCard from '../components/JobCard'

const Jobs = () => {
   const {allJobs} = useSelector(state=>state.job)
    const filterData = [
        {
            filterType:"Location",
            array:["Delhi","Pune","Indore","Kolkata"]
        },
        {
            filterType:"Role",
            array:["Frontend Developer","Backend Developer","Full Stack Developer","UI/UX Designer"]
        },
        {
            filterType:"Salary",
            array:["10-40k","42-1L","1-5L","5L - 10L"]
        },
    ]
    return (
    <section className='p-5 flex text-gray-800'>
        <div className='p-5'>
            <h1 className='border-b border-gray-300  pb-1 text-xl text-gray-900 font-semibold mb-5'>Filter Jobs</h1>
            
        <div className='flex flex-col gap-5'>
            
            {
               filterData.map((data,index)=>{
                   return <div key={index}>
                       <h2 className='font-semibold mb-2 text-xl text-gray-900'>{data.filterType}</h2>
                       <div>
                           {
                               data.array.map((item)=>{
                                   return  <div className='flex gap-2 items-center'>
                                   <input type="radio" id={item} value={item} name={data.filterType} />
                                   <label htmlFor={item}>{item}</label>
                               </div>
                               })
                           }
                       </div>
                   </div>
               })
            }
           </div>
        </div>
        <div className='max-w-7xl flex-1 h-[80vh] overflow-y-scroll p-5 text-gray-800 mx-auto w-full'>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
                {
                    allJobs.map((job)=>{
                        return <JobCard key={job._id} job={job}/>
                    })
                }
            </div>
        </div>
    </section>
  )
}

export default Jobs