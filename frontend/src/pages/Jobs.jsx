import { useSelector } from 'react-redux'
import { useState } from 'react'
import JobCard from '../components/JobCard'


const Jobs = () => {
    
    const { allJobs, isLoading } = useSelector(state => state.job)

    const [selectedFilters, setSelectedFilters] = useState({
        Location: '',
        Role: '',
        Salary: ''
    })

    const filterData = [
        {
            filterType: "Location",
            array: ["Delhi", "Pune", "Indore", "Kolkata"]
        },
        {
            filterType: "Role",
            array: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "UI/UX Designer"]
        },
        {
            filterType: "Salary",
            array: ["10000-40000", "42000-100000", "100000-500000", "500000-1000000"]
        },
    ]

    const handleFilterChange = (filterType, value) => {
        setSelectedFilters(prev => ({
            ...prev,
            [filterType]: value
        }))
    }

    const clearFilters = () => {
        setSelectedFilters({
            Location: '',
            Role: '',
            Salary: ''
        })
    }

    const filteredJobs = allJobs.filter(job => {
        const matchLocation = selectedFilters.Location ? job.location.toLowerCase() === selectedFilters.Location.toLowerCase() : true
        const matchRole = selectedFilters.Role ? job.title.toLowerCase() === selectedFilters.Role.toLowerCase() : true

        let matchSalary = true
        if (selectedFilters.Salary) {
            const [min, max] = selectedFilters.Salary.split('-').map(Number)
            const jobSalary = Number(job.salary)
            if (!isNaN(min) && !isNaN(max) && !isNaN(jobSalary)) {
                matchSalary = jobSalary >= min && jobSalary <= max
            }
        }

        return matchLocation && matchRole && matchSalary
    })

    if (isLoading) {
        return <div className='flex flex-col items-center justify-center h-screen w-full'>
            <h1 className='text-3xl font-medium text-gray-600'>Jobs are loading...</h1>
        </div>
    }

    return (
        <section className='p-5 flex flex-col lg:flex-row text-gray-800 min-h-screen'>
            {/* Filter Section */}
            <div className='p-5 w-full lg:w-[350px]'>
                <div className='flex gap-3 flex-col mb-5'>
                    <h1 className='text-xl text-gray-900 font-semibold'>Filter Jobs</h1>
                    <button
                        onClick={clearFilters}
                        className='btn btn-primary w-fit'
                    >
                        Clear Filters
                    </button>
                </div>
                <div className='flex flex-row md:flex-col gap-5 flex-wrap'>
                    {
                        filterData.map((data, index) => (
                            <div key={index}>
                                <h2 className='font-semibold mb-2 text-lg text-gray-900'>{data.filterType}</h2>
                                <div className='flex flex-col gap-1'>
                                    {
                                        data.array.map((item) => (
                                            <label className='flex gap-2 items-center' key={item}>
                                                <input
                                                    type="radio"
                                                    id={`${data.filterType}-${item}`}
                                                    value={item}
                                                    name={data.filterType}
                                                    checked={selectedFilters[data.filterType] === item}
                                                    onChange={() => handleFilterChange(data.filterType, item)}
                                                />
                                                {item}
                                            </label>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* Job Listing Section */}
            <div className=' h-screen overflow-y-auto p-5'>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
                    {
                        filteredJobs.length > 0 ? (
                            filteredJobs.map((job) => (
                                <JobCard key={job._id} job={job} />
                            ))
                        ) : (
                            <p className='col-span-full text-center text-lg font-medium'>No jobs found for selected filters.</p>
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default Jobs
