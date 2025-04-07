import React from 'react'
import JobCard from '../components/JobCard'

const Browse = () => {
    const results = [1,2,3,4,5,6]
  return (
    <section className='px-5 py-10'>
        <div className='max-w-7xl mx-auto w-full'>
            <h2 className='text-lg mb-5'>Search results ({results.length})</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3'>
                {
                    results.map((item,index)=>{
                        return <JobCard key={index}/>
                    })
                }
            </div>
        </div>
    </section>
  )
}

export default Browse