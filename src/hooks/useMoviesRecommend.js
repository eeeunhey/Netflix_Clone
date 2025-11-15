import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMoviesRecommend = (id) => {
  return api.get(`/movie/${id}/recommendations`);
};

export const useMoviesRecommend = (id) => {
  return useQuery({
    queryKey: ["recommend", id],
    queryFn: () => fetchMoviesRecommend(id),
    select: (data) => data?.data?.results,
  });
};