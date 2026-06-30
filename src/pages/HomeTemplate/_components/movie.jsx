import React from "react";
import { Link } from "react-router-dom";

export default function Movie({ movie }) {
  const FALLBACK_POSTER = "/images/movie-placeholder.jpg";///////

  const handleImageError = (e) => {
    e.target.src = FALLBACK_POSTER;
  };

  return (
    <div className="movie-card d-flex flex-column h-100 w-100">
      {/* Poster */}
      <div className="movie-image-wrapper position-relative">
        <img
          src={movie?.hinhAnh}
          alt={movie?.tenPhim}
          loading="lazy"
          onError={handleImageError}
          className="movie-poster"
        />

        {/* Gradient Overlay */}
        <div className="movie-gradient"></div>

        {/* Hover Overlay */}
        <div className="movie-overlay">
          <Link
            to={`/detail/${movie.maPhim}`}
            className="movie-btn"
          >
            View Details
          </Link>
        </div>

        {/* Rating */}
        <div className="movie-badges">
          <div className="movie-rating">
            ★ {movie.danhGia}
          </div>

          <div className="movie-age">
            PG-13
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="movie-content">
        <h3
          className="movie-title" style={{ minHeight: "48px" }}
          title={movie.tenPhim}
        >
          {movie.tenPhim}
        </h3>

        <p className="movie-description flex-grow-1">
          {movie.moTa ||
            "Movie description is being updated..."}
        </p>

        {/* Mobile Button */}
        <Link
          to={`/detail/${movie.maPhim}`}
          className="movie-mobile-btn"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}