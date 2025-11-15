import { Alert, CircularProgress } from "@mui/material";
import { useMovieCreaits } from "../../../hooks/useMovieCredits";
import "./MovieCredits.style.css";

const PROFILE_BASE = "https://image.tmdb.org/t/p/w185";

const MovieCredits = ({ id }) => {
  const { data, isLoading, isError, error } = useMovieCreaits(id);

  const cast = data?.cast ?? [];
  const crew = data?.crew ?? [];
//   console.log("크레딧", data);

  // 상위 몇 명만 보여주기 (필요하면 숫자 조절)
  const mainCast = cast.slice(0, 9);
  const mainCrew = crew.slice(0, 9);

  if (isLoading) {
    return (
      <div className="detail-credits-loading">
        <CircularProgress size={32} />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert severity="error">
        출연진 정보를 불러오는 중 에러가 발생했어요 😢 {error?.message}
      </Alert>
    );
  }

  return (
    <section className="detail-credits-section">
      <h3 className="detail-section-title">Cast & Crew</h3>

      <div className="detail-credits-layout">
        {/* 캐스트 리스트 */}
        <div className="detail-credits-column">
          <h4 className="detail-credits-subtitle">Cast</h4>
          <div className="detail-cast-list">
            {mainCast.map((person) => (
              <div
                className="detail-cast-item"
                key={person?.cast_id || person?.credit_id}
              >
                <div className="detail-cast-photo-wrapper">
                  {person.profile_path ? (
                    <img
                      src={`${PROFILE_BASE}${person.profile_path}`}
                      alt={person.name}
                      className="detail-cast-photo"
                    />
                  ) : (
                    <div className="detail-cast-photo-placeholder">
                      <span className="detail-cast-initial">
                        {person.name?.[0] || "?"}
                      </span>
                    </div>
                  )}
                </div>
                <p className="detail-cast-name">{person.name}</p>
                <p className="detail-cast-role">{person.character}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieCredits;
