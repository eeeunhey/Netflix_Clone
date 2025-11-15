import { Alert } from "@mui/material";
import { useTrendingWeekQuery } from "../../../../hooks/useTrendingWeek";
import "react-multi-carousel/lib/styles.css";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";


const TrendingWeekSlide = () => {
    const { data, isLoading, isError, error } = useTrendingWeekQuery();

    if (isLoading) return <div>Loading...</div>;

    if (isError) return <Alert severity="error">{error.message}</Alert>;
    console.log("TrendingWeek", data)

    const rankedMovies = (data?.results).map((movie, index) => ({
        ...movie,
        rank: index + 1,
    }));
    return (
        <div>
            <MovieSlider
                title=" TOP 20"
                movies={rankedMovies}
                responsive={responsive}
            />
        </div>
    )
}

export default TrendingWeekSlide
