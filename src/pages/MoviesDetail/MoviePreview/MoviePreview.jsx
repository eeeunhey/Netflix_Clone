
import { CircularProgress, Alert } from "@mui/material";
import YouTube from "react-youtube";
import { useMovieVideo } from "../../../hooks/useMovieVideo";
import "./MoviePreview.style.css"

const MoviePreview = ({ id }) => {
  const { data, isLoading, isError, error } = useMovieVideo(id);

  const videos = data || [];
  const videoId = videos.length > 0 ? videos[0].key : null;


  if (isLoading) {
    return (
      <div className="detail-trailer-loading">
        <CircularProgress size={40} />
      </div>
    );
  }


  if (isError) {
    return (
      <Alert severity="error">
        예고편을 불러오는 중 에러가 발생했어요 😢 {error?.message}
      </Alert>
    );
  }


  const options = {
    playerVars: {
      autoplay: 1,
      mute: 1,
      controls: 1,
    },
  };

  return (
    <section className="detail-trailer-section">
      <h2 >Trailer</h2>

      {videoId ? (
        <div className="detail-trailer-player">
          <YouTube videoId={videoId} opts={options} />
        </div>
      ) : (
        <p className="detail-trailer-empty">예고편을 제공하지 않습니다.</p>
      )}
    </section>
  );
};

export default MoviePreview;
