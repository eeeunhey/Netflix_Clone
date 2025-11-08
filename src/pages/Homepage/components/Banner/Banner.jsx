import { usePopularMoivesQuery } from "../../../../hooks/usePopularMovies"
import Alert from '@mui/material/Alert';
import "./Banner.style.css";

const Banner = () => {

    const {data, isLoading, isError, error} =usePopularMoivesQuery();
    console.log("data",data);
    if(isLoading) {
        <h1>Loading.....</h1>
    }

    if(isError) {
       return <Alert severity="error">{error.message}</Alert>
    }
  return (
    <div style={{
        backgroundImage:"url("+`https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${data.results[0].poster_path}`+")",
    }}
    className="banner"
    >
        Banner
    </div>
  )
}

export default Banner

