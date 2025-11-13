import { useQuery } from "@tanstack/react-query"

const fetchSearchMovie = ({}) => {
    return api.get(`/movie/${movieId}`);
};

export const useSelectMovieQuery=({movieId}) =>{
return useQuery({
    queryKey:['movie-detail', movieId],
    queryFn:()=>fetchSearchMovie({movieId}),
    select:(result) => result.data,
})
}