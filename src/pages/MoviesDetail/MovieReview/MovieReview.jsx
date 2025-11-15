// src/pages/MovieDetail/MovieReview/MovieReview.jsx
import React, { useState } from "react";
import { useMovieReviews } from "../../../hooks/useMovieReview";
import "./MovieReview.style.css";

const MovieReview = ({ id }) => {
  const { data } = useMovieReviews(id);
  const [openIndex, setOpenIndex] = useState(null);

  if (!data || data.length === 0) {
    return <h2 className="review-empty">No reviews yet</h2>;
  }

  return (
    <div className="review-wrapper">
      <div className="review-header-row">
        <h2 className="review-title">Audience Reviews</h2>
        <span className="review-count">{data.length} comments</span>
      </div>

      <ul className="review-grid">
        {data.map((review, i) => {
          const content = review.content || "";
          const isOpen = openIndex === i;
          const isLong = content.length > 200;
          const visibleText = isOpen ? content : content.slice(0, 200);

          const date = review.created_at?.slice(0, 10);

          // 아바타 이미지 처리
          const avatarPath = review.author_details?.avatar_path;
          let avatarUrl = "";
          if (avatarPath) {
            if (avatarPath.startsWith("/https")) avatarUrl = avatarPath.slice(1);
            else if (avatarPath.startsWith("http")) avatarUrl = avatarPath;
            else avatarUrl = `https://image.tmdb.org/t/p/w185${avatarPath}`;
          }
          const initial = (review.author || "?").charAt(0).toUpperCase();

          return (
            <li key={review.id || i} className="review-card">
              <div className="review-card-photo">
                {avatarUrl ? (
                  <img src={avatarUrl} className="review-avatar-img" />
                ) : (
                  <div className="review-avatar-fallback">{initial}</div>
                )}
              </div>

              <div className="review-card-header">
                <h3 className="review-author">{review.author}</h3>

              </div>

              <div className="review-card-meta">
                <span className="review-meta-label">Reviewed on</span>
                <span className="review-meta-value">{date}</span>
              </div>

              <div className="review-card-body">
                <p className="review-body-label">Comment</p>
                <p className="review-body-text">
                  {visibleText}
                  {!isOpen && isLong && "..."}
                </p>

                {isLong && (
                  <button
                    className="review-toggle-btn"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                  >
                    {isOpen ? "Show less" : "Show more"}
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MovieReview;
