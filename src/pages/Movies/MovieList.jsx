import { Grid } from "@mui/material"

const MovieList = ({ movies }) => {
    return (
        <>
            <Grid container spacing={2}>
                {movies.map(() => (
                    <Grid item xs={12} sm={6} lg={3} key={movies.id}>
                    </Grid>
                ))}

            </Grid>

        </>
    )
}

export default MovieList;
