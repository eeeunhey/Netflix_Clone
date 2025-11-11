const requests = {
  fetchTrending: `/trending/movie/week`,
  fetchTopRated: `/movie/top_rated?language=en-US&page=1`,
  fetchNetflixOriginals: `/discover/tv?page=1&timezone=%20Europe`,
  fetchHistoryMovies: `/discover/movie?with_genres=36`,
  fetchAnimationMovies: `/discover/movie?with_genres=16`,
  fetchFantasyMovies: `/discover/movie?with_genres=14`,
  fetchRomanceMovies: `/discover/movie?with_genres=10749`,
};

export default requests;