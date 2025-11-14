import { useQuery } from "@tanstack/react-query"

const fetchMovieVideo = (id) => {
    return api.get(`/movie/${id}/videos`);
}

export const useMovieVideo = (id) => {
    return useQuery({
        queryKey:["movie-video", id],
        queryFn: () => fetchMovieVideo(id),
        select:(data)=> data?.data?.results,
    })
}