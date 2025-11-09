import { usePopularMoivesQuery } from "../../../../hooks/usePopularMovies";
import Alert from "@mui/material/Alert";
import "./Banner.style.css";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoivesQuery();

  console.log("data", data);
  if (isLoading) {
    return <h1>Loading.....</h1>;
  }

  if (isError) {
    return <Alert severity="error">{error.message}</Alert>;
  }
  return (
    <div
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280${data.results[0].backdrop_path})`,
      }}
      className="banner"
    >
      <div className="text-white banner-tex-area">
        <h1>{data.results[0].title}</h1>
        <p>{data.results[0].overview}</p>
      </div>
    </div>
  );
};

export default Banner;
