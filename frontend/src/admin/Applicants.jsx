import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const Applicants = () => {
    const [applications, setApplications] = useState([])

    const { id } = useParams()

    const updateStatus = async (applicationId, status) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/applications/update/${applicationId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({ status })
            });
            const resData = await res.json();

            if (resData.success) {
                toast.success(resData.message);

                // Update the status in local state
                setApplications(prev =>
                    prev.map(app =>
                        app._id === applicationId ? resData.application : app
                    )
                );
            } else {
                toast.error(resData.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };



    useEffect(() => {
        const getApplicantions = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/applications/applicants/${id}`, {
                    credentials: 'include'
                });

                const data = await res.json();

                setApplications(data)
            } catch (error) {
                console.log(error)
            }
        }
        getApplicantions()
    }, [id])

    if (applications.length === 0) {
        return <p>No applicants found.</p>
    }
    return (
        <div className="overflow-auto w-full h-full">
            <h2 className='text-3xl my-5 font-medium'>Applicants</h2>
            <table className="table">
                {/* head */}
                <thead>
                    <tr>

                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Resume</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        applications.map((application) => {
                            return <tr key={application._id}>

                                <td>
                                    {application.applicant.fullName}
                                </td>
                                <td>
                                    {application.applicant.email}
                                </td>
                                <td>
                                    {application.applicant.phone}
                                </td>
                                <td>
                                    <a href={application.applicant.profile.resume} target='_blank' className='underline text-primary'>Resume</a>
                                </td>
                                <td>
                                    {application.createdAt.slice(0, 10)}
                                </td>
                                <td>{application.status || 'Pending'}</td>
                                <select
                                    name="status"
                                    id="status"
                                    className='select select-primary'
                                    value={application.status || ''} // Default to empty if not set
                                    onChange={(e) => updateStatus(application._id, e.target.value)}
                                >
                                    <option  disabled value="">-- Select --</option>
                                    <option value="accepted">Accept</option>
                                    <option value="rejected">Reject</option>
                                </select>

                            </tr>
                        })
                    }

                </tbody>

            </table>
        </div>
    )
}

export default Applicants