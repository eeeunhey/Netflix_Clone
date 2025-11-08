import { usePopularMoivesQuery } from "../../../../hooks/usePopularMovies"

const Banner = () => {

    const {data} =usePopularMoivesQuery();
    console.log("ddd",data);
  return (
    <div>
        Banner
    </div>
  )
}

export default Banner