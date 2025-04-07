import React from 'react'
import { CiLocationOn } from 'react-icons/ci'

const JobDetails = () => {
   
    return (
        <section>
            <div className='max-w-5xl mx-auto px-5 py-10'>
            <div className='flex items-center gap-3 mb-5'>
                    <div className='text-xl bg-purple-700 p-2 rounded-full text-white'>
                        <CiLocationOn/>
                    </div>
                    <span className='text-xl'>Delhi</span>
                </div>

                <div className='flex items-center justify-between '>
                    <h2 className='text-2xl font-medium'>Frontend Developer</h2>
                    <button className='px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700'>Apply</button>
                </div>
                <div className='flex items-center my-5 text-sm gap-3 font-semibold'>
                    <span className='rounded-full px-4 py-1 border  border-gray-200'>
                        12 positions
                    </span>
                    <span className='rounded-full text-purple-600 px-3 py-1 border border-gray-200'>
                        Part time
                    </span>
                    <span className='rounded-full text-green-600 px-3 py-1 border border-gray-200'>
                        12 lpa
                    </span>
                </div>
                <h2 className='text-shadow-md text-xl mb-3'>Job Description</h2>
                <p className='text-gray-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, consequuntur sapiente? Minima consequatur impedit molestiae nostrum, provident architecto! Possimus quam dolore delectus praesentium impedit assumenda natus, maiores enim cum magni.</p>
               
               <div className='mt-5 flex flex-col gap-5'>
               <p>Salary : 12LPA</p>
                <p>Experience : 2 Years</p>
                <p>Total Applicants : 200</p>
                <p>Posted Date : 17-12-2024</p>
               </div>
            </div>
        </section>
    )
}

export default JobDetails