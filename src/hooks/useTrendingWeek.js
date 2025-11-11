import { useQuery } from "@tanstack/react-query"
import api from "../utils/api";
import requests from "../utils/request";


const fetchuseTrendingWeek = () => {
    return api.get(`/trending/movie/week`);
}

export const useTrendingWeekQuery = () => {
    return useQuery({
        queryKey: ["movie-trendingweek"],
        queryFn: () => api.get(requests.fetchTrending),
        select: (result) => result.data,
    })
}