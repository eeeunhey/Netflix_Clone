import NowPlayingMovieSlide from "./NowPlayingMovieSlide";
import PopularMovieSlide from "./PopularMovieSlide";
import UpComingMoviesSlide from "./UpComingMoviesSlide";

export default function MovieSlide() {
  return (
    <div style={{ backgroundColor: "#000", padding: "60px 40px" }}>
      <NowPlayingMovieSlide />
      <PopularMovieSlide />
      <UpComingMoviesSlide />
    </div>
  );
}
