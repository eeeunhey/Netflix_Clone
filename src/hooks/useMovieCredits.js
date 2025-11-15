import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieCredits = (id) => {
  return api.get(`/movie/${id}/credits`);
};

export const useMovieCreaits = (id) => {
  return useQuery({
    queryKey: ["movie-credits", id],
    queryFn: () => fetchMovieCredits(id),
    select: (result) => result?.data,
  });
};
