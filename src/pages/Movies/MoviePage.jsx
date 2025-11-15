import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Box,
  Alert,
  Typography,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";

const genreOptions = [
  { label: "All", value: "all" },
  { label: "Action", value: 28 },
  { label: "Comedy", value: 35 },
  { label: "Drama", value: 18 },
  { label: "Romance", value: 10749 },
  { label: "Thriller", value: 53 },
];

const sortOptions = [
  { label: "Popularity Desc", value: "popularity.desc" },
  { label: "Popularity Asc", value: "popularity.asc" },
  { label: "Rating Desc", value: "vote_average.desc" },
  { label: "Rating Asc", value: "vote_average.asc" },
];

const MoviePage = () => {
  const [query] = useSearchParams();
  const keyword = query.get("q");

  const [currentPage, setCurrentPage] = useState(0);
  const [genreFilter, setGenreFilter] = useState("all");
  const [sortOption, setSortOption] = useState("popularity.desc");

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page: currentPage + 1,
  });

  const list = data?.results ?? [];
  const totalPages = data?.total_pages ?? 1;

  const filteredList = useMemo(() => {
    let result = [...list];

    if (genreFilter !== "all") {
      const genreId = Number(genreFilter);
      result = result.filter((m) => m.genre_ids?.includes(genreId));
    }

    switch (sortOption) {
      case "popularity.asc":
        result.sort((a, b) => (a.popularity ?? 0) - (b.popularity ?? 0));
        break;
      case "popularity.desc":
        result.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
        break;
      case "vote_average.asc":
        result.sort((a, b) => (a.vote_average ?? 0) - (b.vote_average ?? 0));
        break;
      case "vote_average.desc":
        result.sort((a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0));
        break;
      default:
        break;
    }

    return result;
  }, [list, genreFilter, sortOption]);

  const handlePageClick = (e) => {
    setCurrentPage(e.selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (keyword) {
      setCurrentPage(0);
    }
  }, [keyword]);

  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress size={80} sx={{ color: "#e50914" }} />
      </Box>
    );

  if (isError) return <Alert severity="error">{error.message}</Alert>;

  return (
    <Box sx={{ overflowX: "hidden" }}>
      <Container sx={{ py: 10 }}>
        <Box
          sx={{
            mb: 4,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{ color: "white", mb: 0.5, fontWeight: 600 }}
            >
              {keyword ? `"${keyword}" 검색 결과` : "Movies"}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              flexWrap: "wrap",
            }}
          >
            <FormControl
              size="small"
              sx={{
                minWidth: 140,
                bgcolor: "#111827",
                borderRadius: 1.5,
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                "& .MuiSelect-select": { py: 1, px: 2, color: "white" },
                "& .MuiSvgIcon-root": { color: "#9ca3af" },
              }}
            >
              <Select
                value={genreFilter}
                onChange={(e) => setGenreFilter(e.target.value)}
              >
                {genreOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              size="small"
              sx={{
                minWidth: 170,
                bgcolor: "#111827",
                borderRadius: 1.5,
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                "& .MuiSelect-select": { py: 1, px: 2, color: "white" },
                "& .MuiSvgIcon-root": { color: "#9ca3af" },
              }}
            >
              <Select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                {sortOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        {keyword && filteredList.length === 0 && (
          <Box textAlign="center" sx={{ mt: 5, color: "white" }}>
            "{keyword}" 에 대한 결과가 없습니다.
          </Box>
        )}

        {filteredList.length > 0 && (
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  sm: "repeat(3, 1fr)",
                  md: "repeat(4, 1fr)",
                },
                gap: 4,
                justifyItems: "center",
                mb: 4,
              }}
            >
              {filteredList.map((movie) => (
                <Box
                  key={movie.id}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <MovieCard movie={movie} />
                </Box>
              ))}
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 2,
                "& .pagination": {
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75,
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                },
                "& .pagination li a": {
                  minWidth: 36,
                  height: 36,
                  padding: "0 10px",
                  borderRadius: 999,
                  border: "1px solid #3f3f46",
                  backgroundColor: "#18181b",
                  color: "#e5e7eb",
                  fontSize: "0.85rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  userSelect: "none",
                  transition: "all 0.15s ease",
                },
                "& .pagination li a:hover": {
                  backgroundColor: "#27272f",
                },
                "& .pagination li.selected a": {
                  backgroundColor: "#e50914",
                  borderColor: "#e50914",
                  color: "#ffffff",
                },
                "& .pagination li.disabled a": {
                  opacity: 0.35,
                  cursor: "default",
                  backgroundColor: "#18181b",
                },
                "& .pagination li.break a": {
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "default",
                },
              }}
            >
              <ReactPaginate
                className="pagination"
                breakLabel="..."
                nextLabel="›"
                previousLabel="‹"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                marginPagesDisplayed={0}
                pageCount={totalPages}
                forcePage={currentPage}
              />
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default MoviePage;
