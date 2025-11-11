import { Alert } from "@mui/material";
import { useNowPlayingMoviesQuery } from "../../../../hooks/useNowPlayingMovies";

import "react-multi-carousel/lib/styles.css";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const NowPlayingMovieSlide = () => {
  const { data, isLoading, isError, error } = useNowPlayingMoviesQuery();

  // 로딩 처리
  if (isLoading) return <div>Loading...</div>;

  // 에러 처리
  if (isError) return <Alert severity="error">{error.message}</Alert>;

  // 정상 렌더링
  return (
    <div style={{ marginBottom: "48px" }}>
      <MovieSlider
<<<<<<< Updated upstream
        title="현재 상영작"
=======
        title="🎬 현재 상영 중인 영화"
>>>>>>> Stashed changes
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default NowPlayingMovieSlide;
