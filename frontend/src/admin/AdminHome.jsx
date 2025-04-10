import {useSelector} from 'react-redux'

const AdminHome = () => {
  const {user} = useSelector(state=>state.auth)
  return (
    <div className='flex flex-col items-center gap-4'>
      <img src={user.profile.profilePhoto} alt="profile" className='w-24 h-24 border border-gray-400 rounded-full object-cover object-center' />
      <h2 className='text-3xl font-medium'>Welcome {user.fullName}</h2>

    </div>
  )
}

export default AdminHome