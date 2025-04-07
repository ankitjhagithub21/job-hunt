import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';


const LatestJobs = () => {
    const jobs = ['Software Engineer', 'Product Manager', 'Data Analyst', 'UI/UX Designer',"Frontend Developer","Backend Developer"];

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 text-center">
              
                <Swiper
                    spaceBetween={50}
                    slidesPerView={3}
                    navigation={true}  
                    modules={[Navigation]} 
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
                        jobs.slice(0,6).map((job, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <div className="flex-shrink-0 my-5 w-64 mx-auto bg-white rounded-lg custom-shadow p-6">
                                        <h3 className="text-xl font-semibold mb-3">{job}</h3>
                                        <p className="text-gray-600 mb-4">Location: Remote</p>
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
