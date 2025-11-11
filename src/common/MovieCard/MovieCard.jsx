import { Badge, IconButton } from "@mui/material";
import { FavoriteBorder, PlayArrow } from "@mui/icons-material";
import "./MovieCard.style.css";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";

// 백그라운드 사진
const MovieCard = ({ movie }) => {
  const year = movie?.release_date?.slice(0, 4) ?? "—";
  const age = movie?.adult ? "18+" : "12+";

  const { data: genreData } = useMovieGenreQuery();
  console.log("장르임", genreData);

  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id)
      return genreObj.name;
    });

    return genreNameList

  }

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
      {movie.rank && (
        <div className="rank-badge">{movie.rank}</div>
      )}
      <div className="overlay">
        <IconButton className="heart-btn" aria-label="wishlist">
          <FavoriteBorder sx={{ color: "white", fontSize: 22 }} />
        </IconButton>

        <IconButton className="play-btn" aria-label="play">
          <PlayArrow sx={{ fontSize: 40, color: "white" }} />
        </IconButton>

        <div className="movie-info">
          <h3 className="title">{movie.title}</h3>

          <div className="meta">
            <span>{year}</span>
            <span className="age">{age}</span>
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
          <div className="meta">
            {showGenre(movie.genre_ids).map((genre, index) => (
              <Badge className="badge" key={index}>{genre}</Badge>
            ))}
          </div>

          <div className="overview">{movie.overview}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
