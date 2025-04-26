import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation,Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const LatestJobs = () => {
   
    const {allJobs,isLoading} = useSelector(state=>state.job);
    const navigate = useNavigate();

    if (isLoading) {
        return <div className='flex flex-col items-center justify-center h-screen w-full'>
            <h1 className='text-3xl font-medium text-gray-600'>Jobs are loading...</h1>
        </div>
    }

    if(allJobs.length===0){
        return <p className='text-center py-10 px-5 text-xl'>No job available.</p>
    }
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 text-center">
              
                <Swiper
                    spaceBetween={50}
                    slidesPerView={3}
                    navigation={true}  
                    autoplay={true}
                    
                    modules={[Navigation,Autoplay]} 
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween:20,
                        },
                       
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                >
                    {
                        allJobs.slice(0,6).map((job) => {
                            return (
                                <SwiperSlide key={job._id}>
                                    <div className="flex-shrink-0 my-5 w-64 mx-auto bg-white rounded-lg custom-shadow p-6" onClick={()=>navigate(`/job/${job._id}`)}>
                                        <h3 className="text-xl font-semibold mb-3">{job.title}</h3>
                                        <p className="text-gray-600 mb-4">Location: {job.location}</p>
                                        <button className="w-full cursor-pointer hover:bg-purple-700 bg-purple-600 text-white py-2 rounded-lg">Apply Now</button>
                                    </div>
                                </SwiperSlide>
                            );
                        })
                    }
                </Swiper>
            </div>
        </section>
    );
};

export default LatestJobs;
