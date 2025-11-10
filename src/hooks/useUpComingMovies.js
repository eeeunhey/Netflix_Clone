import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";



const fetchUpComingMovies = () => {
  return api.get(`/movie/upcoming`);
};

export const usePopularMoivesQuery = () => {
  return useQuery({
    queryKey: ["moive-upcoming"],
    queryFn: fetchUpComingMovies,
    select:(result)=>result.data
  });
};
