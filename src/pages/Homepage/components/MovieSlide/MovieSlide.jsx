import NowPlayingMovieSlide from "./NowPlayingMovieSlide";
import PopularMovieSlide from "./PopularMovieSlide";
import TrendingWeekSlide from "./TrendingWeekSlide";
import UpComingMoviesSlide from "./UpComingMoviesSlide";

export default function MovieSlide() {
  return (
    <div style={{ backgroundColor: "#000", padding: "60px 40px" }}>
      <TrendingWeekSlide />
      <NowPlayingMovieSlide />
      <PopularMovieSlide />
      <UpComingMoviesSlide />
    </div>
  );
}
