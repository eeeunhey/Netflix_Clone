import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

// 키워드에 따라 값이 반영되기 때문에 키워드를 받아온다 
const fetchSearchMovie = ({ keyword }) => {
  const encoded = keyword ? encodeURIComponent(keyword) : "";
  return keyword
    ? api.get(`/search/movie?query=${encoded}`)
    : api.get(`/movie/popular`);
};


export const useSearchMovieQuery=({keyword}) => {
    return useQuery({
        queryKey:['movie-search',keyword],
        queryFn:()=>fetchSearchMovie({keyword}),
        select:(result) => result.data,
    });
}