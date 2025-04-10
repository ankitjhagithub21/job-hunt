import { useSelector } from 'react-redux'
import { useState } from 'react'
import JobCard from '../components/JobCard'

const Jobs = () => {
    const { allJobs } = useSelector(state => state.job)

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

    const filteredJobs = allJobs.filter(job => {
        const matchLocation = selectedFilters.Location ? job.location === selectedFilters.Location : true
        const matchRole = selectedFilters.Role ? job.title === selectedFilters.Role : true

        let matchSalary = true
        if (selectedFilters.Salary) {
            const [min, max] = selectedFilters.Salary.split('-').map(Number)
            matchSalary = job.salary >= min && job.salary <= max
        }

        return matchLocation && matchRole && matchSalary
    })

    const clearFilters = () => {
        setSelectedFilters({
            Location: '',
            Role: '',
            Salary: ''
        });
    };

    return (
        <section className='p-5 flex text-gray-800 min-h-screen'>
            <div className='p-5'>
                <div className='flex gap-3 flex-col mb-5'>
                    <h1 className=' border-gray-300 text-xl text-gray-900 font-semibold'>Filter Jobs</h1>
                    <button
                        onClick={clearFilters}
                        className='btn btn-primary'
                    >
                        Clear Filters
                    </button>
                </div>
                <div className='flex flex-col gap-5'>
                    {
                        filterData.map((data, index) => (
                            <div key={index}>
                                <h2 className='font-semibold mb-2 text-xl text-gray-900'>{data.filterType}</h2>
                                <div>
                                    {
                                        data.array.map((item) => (
                                            <div className='flex gap-2 items-center' key={item}>
                                                <input
                                                    type="radio"
                                                    id={`${data.filterType}-${item}`}
                                                    value={item}
                                                    name={data.filterType}
                                                    checked={selectedFilters[data.filterType] === item}
                                                    onChange={() => handleFilterChange(data.filterType, item)}
                                                />
                                                <label htmlFor={`${data.filterType}-${item}`}>{item}</label>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className='max-w-7xl flex-1 h-[80vh] overflow-y-scroll p-5 text-gray-800 mx-auto w-full'>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
                    {
                        filteredJobs.length > 0 ? (
                            filteredJobs.map((job) => <JobCard key={job._id} job={job} />)
                        ) : (
                            <p>No jobs found for selected filters.</p>
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default Jobs
