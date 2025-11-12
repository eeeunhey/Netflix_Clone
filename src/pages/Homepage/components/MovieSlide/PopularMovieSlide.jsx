import { Alert } from "@mui/material";
import { usePopularMoivesQuery } from "../../../../hooks/usePopularMovies";
import "react-multi-carousel/lib/styles.css";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const PopularMovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoivesQuery();

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <Alert severity="error">{error.message}</Alert>;

  return (
    <div style={{ marginBottom: "48px" }}>
      <MovieSlider
<<<<<<< Updated upstream
        title="인기 상영작"
=======
        title="🔥 인기 상영작"
>>>>>>> Stashed changes
        movies={data?.results}
        responsive={responsive}
      />
    </div>
  );
};

export default PopularMovieSlide;
