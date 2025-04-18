import Hero from "../components/Hero"
import LatestJobs from "../components/LatestJobs"
import Reviews from "../components/Reviews";
import useGetAllJobs from "../hooks/useGetAllJobs"

const Home = () => {
  useGetAllJobs();
  return (
    <>
      <Hero />
      <LatestJobs />
      <Reviews/>

    </>
  )
}

export default Home