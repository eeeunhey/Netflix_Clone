import React, { useEffect, useMemo, useState } from "react";
import { Container, Grid, Alert, Box, InputBase } from "@mui/material";
import SpinnerLoader from "../../compopnents/SpinnerLoader";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";

const MoviePage = () => {
  const [query] = useSearchParams();
  const keyword = query.get("q");
  const [currentPage, setCurrentPage] = useState(0);
  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page: currentPage + 1,
  });



  const list = data?.results ?? [];
  const totalPages = data?.total_pages ?? 1;

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
        <SpinnerLoader />
      </Box>
    );
  if (isError) return <Alert severity="error">{error.message}</Alert>;

  return (
    <Box sx={{ overflowX: "hidden" }}>
      <Container sx={{ py: 10 }}>
        {keyword && list.length === 0 && (
          <Box textAlign="center" sx={{ mt: 5, color: "white" }}>
            "{keyword}" 에 대한 결과가 없습니다.
          </Box>
        )}

        {list.length > 0 && (
          <Grid container spacing={2}>
            {/* 왼쪽 검색 영역 */}
            <Grid  xs={12} lg={4}>
              <Box>
                {/* <InputBase
                  placeholder="입력"
                  sx={{
                    bgcolor: "#333",
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    color: "white",
                    width: "100%",
                  }}
                /> */}
              </Box>
            </Grid>

            {/* 오른쪽 영화 카드 영역 */}
            <Grid  xs={12} lg={8}>
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
                  mb: 3,
                  overflowX: "hidden",
                }}
              >
                {list.map((movie) => (
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

              {/* 페이지네이션 */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  "& .pagination": {
                    display: "flex",
                    gap: 1,
                    listStyle: "none",
                    p: 0,
                    m: 0,
                  },
                  "& .pagination li a": {
                    display: "inline-block",
                    padding: "6px 10px",
                    borderRadius: "8px",
                    border: "1px solid #444",
                    cursor: "pointer",
                    userSelect: "none",
                  },
                  "& .pagination li.selected a": {
                    background: "#d21919ff",
                    color: "#fff",
                  },
                  "& .pagination li.disabled a": {
                    opacity: 0.5,
                    cursor: "default",
                  },
                }}
              >
                <ReactPaginate
                  className="pagination"
                  breakLabel="..."
                  nextLabel="next ›"
                  previousLabel="‹ prev"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={ totalPages }
                  forcePage={currentPage}
                  renderOnZeroPageCount={null}
                />
              </Box>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default MoviePage;
