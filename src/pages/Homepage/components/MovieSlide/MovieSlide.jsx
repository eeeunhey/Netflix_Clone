import NowPlayingMovieSlide from "./NowPlayingMovieSlide";
import PopularMovieSlide from "./PopularMovieSlide";
import TrendingWeekSlide from "./TrendingWeekSlide";
import UpComingMoviesSlide from "./UpComingMoviesSlide";

export default function MovieSlide() {
  return (
    <div >
      <TrendingWeekSlide />
      <NowPlayingMovieSlide />
      <PopularMovieSlide />
      <UpComingMoviesSlide />
    </div>
  );
}
