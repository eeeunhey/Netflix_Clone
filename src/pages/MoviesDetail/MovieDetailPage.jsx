import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Chip,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Grid,
  Container,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMovieDetail } from "../../hooks/useMovieDetail";

const BACKDROP_BASE = "https://image.tmdb.org/t/p/original";
const POSTER_BASE = "https://image.tmdb.org/t/p/w500";

const MovieDetailPage = ({ isModal = false }) => {
  const { id } = useParams();
  const nav = useNavigate();
  const { data: movie, isLoading, isError, error } = useMovieDetail(id);

  if (isLoading) return <div style={{ color: "white", padding: 80 }}>Loading…</div>;
  if (isError || !movie)
    return <div style={{ color: "white", padding: 80 }}>Error… {error?.message}</div>;

  const backdropUrl = movie.backdrop_path && `${BACKDROP_BASE}${movie.backdrop_path}`;
  const posterUrl = movie.poster_path && `${POSTER_BASE}${movie.poster_path}`;
  const year = movie.release_date?.slice(0, 4);
  const trailerUrl = "https://www.youtube.com/results?search_query=" + encodeURIComponent(movie.title + " trailer");

  const content = (
    <Box sx={{ minHeight: "100vh", position: "relative", color: "white" }}>
      {/* Background Image */}
      {backdropUrl && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${backdropUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.45)",
            zIndex: -2,
          }}
        />
      )}

      {/* Background Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.9))",
          zIndex: -1,
        }}
      />

      <Container maxWidth="lg" sx={{ py: 10 }}>
        {/* Content Card */}
        <Box
          sx={{
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(0,0,0,0.45)",
            borderRadius: 4,
            boxShadow: "0 0 40px rgba(0,0,0,0.5)",
            p: 4,
          }}
        >
          <Grid container spacing={4}>
            {/* Movie Poster */}
            <Grid item xs={12} md={4}>
              {posterUrl && (
                <Box
                  component="img"
                  src={posterUrl}
                  alt={movie.title}
                  sx={{ width: "100%", borderRadius: 3, boxShadow: 4 }}
                />
              )}
            </Grid>

            {/* Movie Details */}
            <Grid item xs={12} md={8}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {movie.title}{" "}
                {year && (
                  <Typography
                    component="span"
                    variant="h5"
                    sx={{ color: "grey.400", fontWeight: "normal" }}
                  >
                    ({year})
                  </Typography>
                )}
              </Typography>

              {movie.tagline && (
                <Typography sx={{ mt: 1, fontStyle: "italic", color: "grey.300" }}>
                  {movie.tagline}
                </Typography>
              )}

              {/* Genres */}
              <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
                {movie.genres?.map((g) => (
                  <Chip
                    key={g.id}
                    label={g.name}
                    variant="outlined"
                    sx={{ color: "white", borderColor: "rgba(255,255,255,0.3)" }}
                  />
                ))}
              </Box>

              {/* Overview */}
              <Typography sx={{ mt: 2, lineHeight: 1.6 }}>{movie.overview}</Typography>

              {/* Stats */}
              <Box sx={{ mt: 3, display: "flex", gap: 3, flexWrap: "wrap" }}>
                <Typography variant="body2">
                  ⭐ Rating: {movie.vote_average?.toFixed(1) ?? "N/A"}
                </Typography>
                <Typography variant="body2">
                  ⏱ Runtime: {movie.runtime ? `${movie.runtime} mins` : "N/A"}
                </Typography>
                <Typography variant="body2">
                  📅 Release Date: {movie.release_date}
                </Typography>
              </Box>

              {/* Trailer Button */}
              <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  href={trailerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ px: 4, py: 1.5, borderRadius: 999 }}
                >
                  WATCH TRAILER
                </Button>

                {/* Modal Close Button */}
                {isModal && (
                  <Button
                    variant="outlined"
                    onClick={() => nav(-1)}
                    sx={{ px: 4, py: 1.5, borderRadius: 999, color: "grey.300" }}
                  >
                    Close
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );

  if (isModal) {
    return (
      <Dialog
        open
        onClose={() => nav(-1)}
        maxWidth="lg"
        fullWidth
        PaperProps={{ sx: { bgcolor: "transparent", boxShadow: "none" } }}
      >
        <IconButton
          onClick={() => nav(-1)}
          sx={{ position: "absolute", right: 20, top: 20, color: "white", zIndex: 10 }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent sx={{ p: 0 }}>{content}</DialogContent>
      </Dialog>
    );
  }

  return content;
};

export default MovieDetailPage;
