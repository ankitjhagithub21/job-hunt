import React from 'react'
import JobCard from '../components/JobCard'
import { useSelector } from 'react-redux'

const Browse = () => {
   const {allJobs} = useSelector(state=>state.job)
  return (
    <section className='px-5 min-h-screen py-10'>
        <div className='max-w-7xl mx-auto w-full'>
            <h2 className='text-lg mb-5'>Search results ({allJobs.length})</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3'>
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

export default Browse