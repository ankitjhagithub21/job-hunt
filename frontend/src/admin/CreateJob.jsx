import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const CreateJob = () => {
  const { companies } = useSelector(state => state.company)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    jobType: '',
    experience: '',
    positions: '',
    companyId: '',
    salary: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/jobs/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })

      const data = await res.json();
      if (data.success) {
        toast.success(data.message)
        navigate("/admin/jobs")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Error creating job.")
      console.log(error)
    } finally {
      setLoading(false)
    }
    // Handle API call here
  };

  return (
    <div className=" h-full w-full">
      <h2 className="text-3xl font-medium text-center my-5">Post a Job</h2>
      <form onSubmit={handleSubmit} className="grid p-8 custom-shadow rounded-xl max-w-3xl mx-auto w-full lg:grid-cols-2 grid-cols-1 gap-4">
        <input className='input input-primary w-full' name="title" value={formData.title} onChange={handleChange} placeholder="Job Title" required />

        <input className='input input-primary w-full' type='number' name="experience" value={formData.experience} onChange={handleChange} placeholder="Experience in years" required />

        <input className='input input-primary w-full' name="positions" value={formData.positions} onChange={handleChange} placeholder="Number of Positions" type="number" required />
        <input className='input input-primary w-full' name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" required />

        <select className='select select-primary w-full' name="jobType" value={formData.jobType} onChange={handleChange} required>
          <option value="" disabled>Select Job Type</option>
          <option value="Full-Time">Full Time</option>
          <option value="Part-Time">Part Time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>

        <select className='select select-primary w-full' name="companyId" value={formData.companyId} onChange={handleChange} required>
          <option value="" disabled>Select Company</option>
          {
            companies.map((company) => {
              return <option key={company._id} value={company._id}>{company.name}</option>
            })
          }
        </select>





        <textarea className='textarea textarea-primary w-full' name="description" value={formData.description} onChange={handleChange} placeholder="Job Description" required></textarea>

        <textarea className=' textarea textarea-primary w-full' name="requirements" value={formData.requirements} onChange={handleChange} placeholder="Job Requirements" required></textarea>
        <input className='input input-primary w-full' name="location" value={formData.location} onChange={handleChange} placeholder="Job Location" required />

        <div>
          <button className='btn btn-primary' type="submit" disabled={loading}>
            {
              loading ? 'Please wait ...' : 'Post Job'
            }
          </button>
        </div>
      </form>
      {
        companies.length === 0 && <p className='text-red-500 text-center text-sm my-5'>Please register a company before creating a job.</p>
      }
    </div>
  );
};

export default CreateJob;
