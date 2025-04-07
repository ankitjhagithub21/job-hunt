import { FaRegBookmark } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const JobCard = () => {
  const navigate = useNavigate();
  const job ={
    _id:123456,
  }
  return (
    <div className='flex flex-col gap-2 p-4 custom-shadow rounded-lg'>
      <div className='flex items-center justify-between'>
        <span className='text-sm'>2 days ago</span>
        <FaRegBookmark />
      </div>
      <div className='flex gap-3 items-center'>
        <div>
          <img src="https://mailmeteor.com/logos/assets/PNG/Microsoft_Logo_512px.png" alt="company_logo" className='w-10 h-10 rounded-lg object-cover' />
        </div>
        <div className='flex flex-col gap-1 items-start justify-center'>
          <h5 className='font-semibold leading-4 text-gray-900'>Company Name</h5>
          <h6 className='text-sm leading-3'>Location</h6>
        </div>
      </div>
      <h2 className='text-xl font-semibold text-gray-900'>Title</h2>
      <p className='leading-5 text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem laborum ipsam pariatur, harum dolor, eius nihil fugit provident deleniti esse voluptatibus nesciunt, minima repudiandae dolorem corporis commodi officia itaque quas?</p>
      <div className='flex items-center my-2 text-sm gap-3 font-semibold'>
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
      <button onClick={()=>navigate(`/job/${job._id}`)} type='button' className='text-sm rounded-lg cursor-pointer hover:bg-gray-100 border border-gray-300 px-4 py-2 text-gray-800'>Details</button>
    </div>
  )
}

export default JobCard