import { Alert } from "@mui/material";
import { useUpComingMoviesQuery } from "../../../../hooks/useUpComingMovies";
import "react-multi-carousel/lib/styles.css";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const UpComingMoviesSlide = () => {
  const { data, isLoading, isError, error } = useUpComingMoviesQuery();

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <Alert severity="error">{error.message}</Alert>;
<<<<<<< Updated upstream
    console.log("TT",data)
  // 정상 렌더링
  return (
    <div style={{ marginBottom: "48px" }}>
      <MovieSlider
        title="개봉 예정작 "
=======


  return (
    <div style={{ marginBottom: "48px" }}>
      <MovieSlider
        title="🎥 개봉 예정작"
>>>>>>> Stashed changes
        movies={data?.results}
        responsive={responsive}
      />
    </div>
  );
};

export default UpComingMoviesSlide;
