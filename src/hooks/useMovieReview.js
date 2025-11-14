import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";

const fetchMovieReviews = (id) => {
  return api.get(`/movie/${id}/reviews`);
};

export const useMovieReviews = (id) => {
  return useQuery({
    queryKey: ["reviews", id],
    queryFn: () => fetchMovieReviews(id),
    select: (data) => data?.data.results,
  });
};