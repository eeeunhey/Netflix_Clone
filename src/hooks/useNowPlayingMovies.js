import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";



const fetchNowPlayingMovies = () => {
  return api.get(`/movie/nowPlaying`);
};

export const useNowPlayingMoviesQuery = () => {
  return useQuery({
    queryKey: ["moive-NowPlaying"],
    queryFn: fetchNowPlayingMovies,
    select:(result)=>result.data
  });
};
