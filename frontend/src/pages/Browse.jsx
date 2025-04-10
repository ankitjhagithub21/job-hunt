import React, { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Browse = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const {allJobs} = useSelector(state=>state.job)

    useEffect(() => {
        const getJobs = async () => {
            if (!query) {
                setJobs(allJobs)
                return;
            }

            setLoading(true);
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/jobs?keyword=${query}`);
                const data = await res.json();
                if (res.ok) {
                    setJobs(data);
                } else {
                    setJobs([]);
                    console.error('Failed to fetch jobs');
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
            } finally {
                setLoading(false);
            }
        };

        getJobs();
    }, [query]);

    return (
        <section className="px-5 min-h-screen py-10">
            <div className="max-w-7xl mx-auto w-full">
                <h2 className="text-lg mb-5">
                    {query ? `Search results for "${query}" (${jobs.length})` : 'Browse Jobs'}
                </h2>

                {loading ? (
                    <p>Loading jobs...</p>
                ) : jobs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3">
                        {jobs.map((job) => (
                            <JobCard key={job._id} job={job} />
                        ))}
                    </div>
                ) : (
                    <p>No jobs found for "{query}".</p>
                )}
            </div>
        </section>
    );
};

export default Browse;
