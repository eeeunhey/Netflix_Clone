// 영화를 들고오자
// 슬라이더 가져오기

import { Alert } from "@mui/material";
import { usePopularMoivesQuery } from "../../../../hooks/usePopularMovies";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../MovieCard/MovieCard";
import "./PopularMovieSlide.style.css"
// popular 훅을 가져와서 사용하자!
// 훅을 만드니깐 아래처럼 들고오면 되니깐 아주 편리해졌다 굿굿!

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const PopularMovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoivesQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <Alert severity="error">{error.message}</Alert>;
  }
  return (
    <div>
      <h3>Popular Movies</h3>
      <Carousel
        infinite={true}
        centerMode={true}
        itemClass="movie-slider p-1"
        containerClass="carousel-container"
        responsive={responsive}
      >
        {data.results.map((movie, index) => (
          <MovieCard movie={movie} key={index} />
        ))}
      </Carousel>
    </div>
  );
};

export default PopularMovieSlide;
