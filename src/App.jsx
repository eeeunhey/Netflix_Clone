// src/App.jsx
import "./App.css";
import { Routes, Route } from "react-router-dom"; 
import AppLayout from "./layout/AppLayout";
import Homepage from "./pages/Homepage/Homepage";
import MoviePage from "./pages/Movies/MoviePage";
import MovieDetailPage from "./pages/MoviesDetail/MovieDetailPage";
// import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Homepage />} />

          {/* /movies, /movies/:id, /movies/:id/recommendation, /movies/:id/reviews */}
          <Route path="movies">
            <Route index element={<MoviePage />} />
            {/* <Route path=":id" element={<MovieDetailPage />} /> */}


            <Route path=":id/recommendation" element={<div>추천 영화</div>} />
            <Route path=":id/reviews" element={<div>리뷰 목록</div>} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
