import Footer from "../components/Footer"
import Hero from "../components/Hero"
import LatestJobs from "../components/LatestJobs"
import useGetAllJobs from "../hooks/useGetAllJobs"

const Home = () => {
  useGetAllJobs();
  return (
    <div>
      <Hero/>
      <LatestJobs/>
      <Footer/>
    </div>
  )
}

export default Home