import Hero from "../components/Hero"
import LatestJobs from "../components/LatestJobs"
import useGetAllJobs from "../hooks/useGetAllJobs"
import Browse from "./Browse";

const Home = () => {
  useGetAllJobs();
  return (
    <>
      <Hero/>
      <LatestJobs/>
      <Browse/>
    </>
  )
}

export default Home