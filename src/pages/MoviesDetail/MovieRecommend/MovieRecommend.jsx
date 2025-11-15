import React from "react";
import { useMoviesRecommend } from "../../../hooks/useMovieRecommend";
import Carousel from "react-multi-carousel";

const MovieRecommend = ({ id }) => {
  const data = useMoviesRecommend(id)?.data ?? [];

  return (
    <div className="recommend-container">
      <div className="recommend-title">
        <h2>Recommend Movies</h2>
        {data?.length > 0 ? (
          <Carousel
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3500}
            centerMode={false}
            itemClass="movie-slider p-1"
            containerClass="carousel-container"
            responsive={responsive}
          >
            {data?.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </Carousel>
        ) : (
          <p>추천 영화가 없습니다</p>
        )}
      </div>
    </div>
  );
};

export default MovieRecommend;
