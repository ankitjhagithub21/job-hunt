import Hero from "../components/Hero"
import LatestJobs from "../components/LatestJobs"
import useGetAllJobs from "../hooks/useGetAllJobs"

const Home = () => {
  useGetAllJobs();
  return (
    <>
      <Hero/>
      <LatestJobs/>
    </>
  )
}

export default Home