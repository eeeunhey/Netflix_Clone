import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

// 키워드에 따라 값이 반영되기 때문에 키워드를 받아온다 
const fetchSearchMovie = ({ keyword, page }) => {

  return keyword
    ? api.get(`/search/movie?query=${keyword}&page=${page}`)
    : api.get(`/movie/popular?page=${page}`);
};

export const useSearchMovieQuery=({keyword, page}) => {
    return useQuery({
        queryKey:['movie-search',{keyword,page}],
        queryFn:()=>fetchSearchMovie({keyword, page}),
        select:(result) => result.data,
    });
}