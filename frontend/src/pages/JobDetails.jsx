import React, { useEffect, useState } from 'react'
import { CiLocationOn } from 'react-icons/ci'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoadingPage from './LoadingPage';
import NotFound from './NotFound';
import { toast } from 'react-toastify';

const JobDetails = () => {
    const { user } = useSelector(state => state.auth)
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true)
    const [isApplied, setIsApplied] = useState(false);
    useEffect(() => {

        const getJobDetails = async () => {
            setLoading(true)
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/jobs/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setJob(data)
                    setIsApplied(data.applications.some((app) => app.applicant == user?._id))
                }

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        getJobDetails()
    }, [id])

    const handleApplyJob = async () => {
        if (!user) {
            return toast.error("You are not logged in.")
        }
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/applications/apply/${id}`, {
                method: "POST",
                credentials: 'include'
            })
            const data = await res.json();
            if (data.success) {
                toast.success(data.message)
                setJob(data.job)
                setIsApplied(true);

            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    if (loading) {
        return <LoadingPage />
    }
    if (!job) {
        return <NotFound />
    }

    return (
        <section>
            <div className='max-w-5xl mx-auto px-5 py-10'>
                <div className='flex items-center gap-3 mb-3'>
                    <img src={job.company.logo} alt="" className='w-10 h-10 rounded-lg' />
                    <h2 className='text-xl '>{job.company.name}</h2>
                </div>



                <div className='flex items-center justify-between '>
                    <h2 className='text-2xl font-medium'>{job.title}</h2>
                    <button disabled={isApplied} onClick={handleApplyJob} className={`px-4 py-2 ${isApplied ? 'bg-purple-500' : 'bg-purple-600 hover:bg-purple-700'} text-white rounded-lg`}>
                        {
                            isApplied ? 'Already Applied' : 'Apply'
                        }</button>
                </div>


                <div className='flex items-center my-5 text-sm gap-3 font-semibold'>
                    <span className='rounded-full px-4 py-1 border  border-gray-200'>
                        {job.positions} positions
                    </span>
                    <span className='rounded-full text-purple-600 px-3 py-1 border border-gray-200'>
                        {job.jobType}
                    </span>
                    <span className='rounded-full text-green-600 px-3 py-1 border border-gray-200'>
                        {job.salary}
                    </span>
                </div>
                <h2 className='text-shadow-md text-xl mb-3'>Job Description</h2>

                <p className='text-gray-800'>{job.description}</p>
                <div className='flex items-center gap-3 my-5'>
                    <div className='text-xl bg-purple-700 p-2 rounded-full text-white'>
                        <CiLocationOn />
                    </div>
                    <span className='text-xl'>{job.location}</span>
                </div>
                <h2 className='text-shadow-md text-xl my-3'>Requirements</h2>
                <ul className='list-disc'>
                    {
                        job.requirements.map((item, index) => {
                            return <li key={index}>{item}</li>
                        })
                    }
                </ul>

                <div className='mt-5 flex flex-col text-lg gap-5'>
                    <p>Salary : <span className='text-purple-600'>{job.salary}</span> </p>
                    <p>Experience : <span className="text-purple-600">{job.experience}</span> Year</p>
                    <p>Total Applicants : <span className="text-green-600">{job.applications.length}</span> </p>
                    <p>Posted Date : {job.createdAt.slice(0, 10)}</p>
                </div>
            </div>
        </section>
    )
}

export default JobDetails