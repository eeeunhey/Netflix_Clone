import React, { useMemo, useState } from "react";
import { Container, Grid, Alert, Box } from "@mui/material";
import SpinnerLoader from "../../compopnents/SpinnerLoader";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";

const MoviePage = () => {
  const [query] = useSearchParams();
  const keyword = query.get("q");
  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword });

  // ✅ 클라이언트 페이지네이션 (이 파일 안에서만 처리)
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(0); // ReactPaginate는 0-based

  const list = useMemo(
    () => (data?.results ?? []).filter((m) => !!m.poster_path),
    [data]
  );
  const pageCount = Math.max(1, Math.ceil(list.length / itemsPerPage));
  const start = currentPage * itemsPerPage;
  const currentItems = list.slice(start, start + itemsPerPage);

  const handlePageClick = (e) => {
    setCurrentPage(e.selected); // 0-based index
    // 필요하면 여기서 스크롤 상단 이동:
    // window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) return <SpinnerLoader />;
  if (isError) return <Alert severity="error">{error.message}</Alert>;

  return (
    <Container sx={{ py: 3 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Box>안녕</Box>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Box>필터ㅇㅇㅇㅇ</Box>
        </Grid>

        <Grid size={{ xs: 12, lg: 8 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: 2,
              justifyItems: "center",
              mb: 3,
            }}
          >
            {currentItems.map((movie) => (
              <Box key={movie.id} sx={{ width: "100%", maxWidth: 220 }}>
                <MovieCard movie={movie} />
              </Box>
            ))}
          </Box>

          {/* ✅ 페이지네이션 */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              "& .pagination": { display: "flex", gap: 1, listStyle: "none", p: 0, m: 0 },
              "& .pagination li a": {
                display: "inline-block",
                padding: "6px 10px",
                borderRadius: "8px",
                border: "1px solid #444",
                cursor: "pointer",
                userSelect: "none",
              },
              "& .pagination li.selected a": {
                background: "#1976d2",
                color: "#fff",
                borderColor: "#1976d2",
              },
              "& .pagination li.disabled a": { opacity: 0.5, cursor: "default" },
            }}
          >
            <ReactPaginate
              className="pagination"
              breakLabel="..."
              nextLabel="next ›"
              previousLabel="‹ prev"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              forcePage={Math.min(currentPage, pageCount - 1)}
              renderOnZeroPageCount={null}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MoviePage;
