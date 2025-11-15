// src/pages/MovieDetail/MovieDetailPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Modal,
  Box,
  CircularProgress,
  Alert,
  Button,
  Chip,
} from "@mui/material";
import { Star } from "lucide-react";
import { useMovieDetail } from "../../hooks/useMovieDetail";

import "./MovieDatailPage.style.css";
import MoviePreview from "./MoviePreview/MoviePreview";
import MovieCredits from "./MovieCredits/MovieCredits";
import MovieRecommend from "./MovieRecommend/MovieRecommend";
import MovieReview from "./MovieReview/MovieReview";



const BACKDROP_BASE = "https://image.tmdb.org/t/p/original";
const POSTER_BASE = "https://image.tmdb.org/t/p/w500";

// MUI Modal
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 1100,
  maxHeight: "90vh",
  bgcolor: "transparent",
  boxShadow: 24,
  borderRadius: 4,
  overflowY: "auto",
  p: 0,
};

const MovieDetailContent = ({ movie }) => {
  const backdropUrl = BACKDROP_BASE + (movie.backdrop_path || "");
  const posterUrl = POSTER_BASE + (movie.poster_path || "");
  const year = (movie.release_date || "").slice(0, 4);
  const rating = (movie.vote_average || 0).toFixed(1);
  const runtime = (movie.runtime || "N/A") + " min";
  const tmdbUrl = `https://www.themoviedb.org/movie/${movie.id}`;

  return (
    <div className="detail-page">
      <div className="detail-backdrop-header">
        {backdropUrl ? (
          <img
            src={backdropUrl}
            alt={movie.title}
            className="detail-backdrop-image"
          />
        ) : (
          <div className="detail-backdrop-fallback" />
        )}
        <div className="detail-backdrop-overlay" />
      </div>

      <div className="detail-main">
        <div className="detail-poster-area">
          <div className="detail-poster-frame">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={movie.title}
                className="detail-poster-image"
              />
            ) : (
              <div className="detail-poster-empty">
                <span className="detail-poster-empty-text">
                  No poster available
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 정보 영역 */}
        <div className="detail-info-area">
          {/* 제목 + 연도 */}
          <h2 className="detail-title">
            {movie.title}{" "}
            {year && <span className="detail-year">({year})</span>}
          </h2>

          {/* 태그라인 */}
          {movie.tagline && <p className="detail-tagline">{movie.tagline}</p>}

          {/* 평점 / 러닝타임 / 개봉일 */}
          <div className="detail-meta">
            <span className="detail-meta-item detail-meta-rating">
              <Star className="detail-meta-rating-icon" size={18} />
              {rating}
            </span>
            <span className="detail-meta-dot">•</span>
            <span className="detail-meta-item">{runtime}</span>
            <span className="detail-meta-dot">•</span>
            <span className="detail-meta-item">
              {movie.release_date || "N/A"}
            </span>
          </div>

          <div className="detail-genres">
            {movie.genres?.map((g) => (
              <Chip
                key={g.id}
                label={g.name}
                size="small"
                className="detail-genre-chip"
              />
            ))}
          </div>

          <h3 className="detail-section-title">Overview</h3>
          <p className="detail-overview">{movie.overview}</p>

          <div className="detail-buttons">
            <Button
              variant="outlined"
              className="detail-btn-secondary"
              href={tmdbUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch Now
            </Button>
            <Button variant="outlined" className="detail-btn-secondary">
              + Add to Watchlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: movie, isLoading, isError, error } = useMovieDetail(id);


  const handleClose = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <Modal open onClose={handleClose}>
        <Box sx={modalStyle} className="detail-modal-box">
          <div className="detail-loading">
            <CircularProgress size={80} />
          </div>
        </Box>
      </Modal>
    );
  }

  if (isError || !movie) {
    return (
      <Modal open onClose={handleClose}>
        <Box sx={modalStyle} className="detail-modal-box">
          <div className="detail-error">
            <Alert severity="error">{error?.message}</Alert>
          </div>
        </Box>
      </Modal>
    );
  }

  return (
    <Modal open onClose={handleClose}>
      <Box sx={modalStyle} className="detail-modal-box">
        <Button
          onClick={handleClose}
          className="detail-close-btn"
          sx={{
            position: "absolute",
            top: 12,
            right: 16,
            minWidth: 0,
            width: 36,
            height: 36,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.1)",
            color: "#fff",
            zIndex: 2,
            "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
          }}
        >
          ✕
        </Button>

        <MovieDetailContent movie={movie} />
        <MovieCredits id={id} />
        <MoviePreview id={id} />
        <MovieRecommend id={id} />
        <MovieReview id={id} />
      </Box>
    </Modal>
  );
};

export default MovieDetailPage;
