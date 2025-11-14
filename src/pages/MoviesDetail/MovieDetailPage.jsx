import React from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Box,
  Typography,
  Chip,
  Button,
} from "@mui/material";
import { useMovieDetail } from "../../hooks/useMovieDetail";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data: movie, isLoading, isError, error } = useMovieDetail(id);

  // 1. 로딩 / 에러 처리
  if (isLoading) {
    return (
      <div style={{ paddingTop: "80px", color: "white", textAlign: "center" }}>
        불러오는 중...
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div style={{ paddingTop: "80px", color: "white", textAlign: "center" }}>
        에러가 발생했어요 😢
        <br />
        {error?.message}
      </div>
    );
  }

  // 2. 자주 쓰는 값들 정리
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "";
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "";
  const trailerUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${movie.title} trailer`
  )}`;

  return (
    <div >
      {/* 전체 배경 */}
      <Box
        sx={{
          minHeight: "calc(100vh - 80px)",
          bgcolor: "#05030f",
          color: "white",
          display: "flex",
          alignItems: "center",
          py: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            {/* 왼쪽 : 포스터 */}
            <Grid item xs={12} md={4}>
              {posterUrl && (
                <Box
                  component="img"
                  src={posterUrl}
                  alt={movie.title}
                  sx={{
                    width: "100%",
                    borderRadius: 3,
                    boxShadow: 5,
                    display: "block",
                  }}
                />
              )}
            </Grid>

            {/* 오른쪽 : 정보 */}
            <Grid item xs={12} md={8}>
              {/* 제목 + 연도 */}
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

              {/* 태그라인 */}
              {movie.tagline && (
                <Typography
                  variant="subtitle1"
                  sx={{ mt: 1, color: "grey.400", fontStyle: "italic" }}
                >
                  {movie.tagline}
                </Typography>
              )}

              {/* 장르 칩 */}
              <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
                {movie.genres?.map((genre) => (
                  <Chip
                    key={genre.id}
                    label={genre.name}
                    color="primary"
                    variant="outlined"
                    sx={{
                      borderRadius: 999,
                      borderColor: "rgba(255,255,255,0.3)",
                      color: "white",
                    }}
                  />
                ))}
              </Box>

              {/* 줄거리 */}
              <Typography variant="body1" sx={{ mt: 2, lineHeight: 1.6 }}>
                {movie.overview}
              </Typography>

              {/* 별점/런타임/개봉일 */}
              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  gap: 3,
                  flexWrap: "wrap",
                  fontSize: 14,
                }}
              >
                <Typography variant="body2">
                  <strong>⭐ Rating:</strong>{" "}
                  {movie.vote_average?.toFixed(1) ?? "N/A"}
                </Typography>
                <Typography variant="body2">
                  <strong>⏱ Runtime:</strong>{" "}
                  {movie.runtime ? `${movie.runtime} mins` : "N/A"}
                </Typography>
                <Typography variant="body2">
                  <strong>📅 Release Date:</strong>{" "}
                  {movie.release_date || "N/A"}
                </Typography>
              </Box>

              {/* 트레일러 버튼 */}
              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 999,
                    fontWeight: "bold",
                  }}
                  href={trailerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WATCH TRAILER
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default MovieDetailPage;
