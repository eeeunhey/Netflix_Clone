import { Badge } from "@mui/material";
import "./MovieCard.style.css";

// 백그라운드 사진
const MovieCard = ({ movie }) => {
  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}` +
          ")",
      }}
      className="movie-card"
    >
      <div className="overlay">
        <div>
          <h1>{movie.title}</h1>
          {movie.genre_ids.map((id) => (
            <Badge badgeContent={4} color="error">
              {id}
            </Badge>
          ))}
        </div>
        <div className="movie-info">
          <div className="badge">{movie.vote_average}</div>
          <div className="badge">{Math.round(movie.popularity)}</div>
          <div className="age">{movie.adult ? "18+" : "ALL"}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
