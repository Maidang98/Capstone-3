import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import {
  fetchMoviesForBooking,
  fetchMovieSchedule,
  clearSchedule,
  selectAllMovies,
  selectMovieSchedule,
} from "../../Booking/slice";

export default function QuickBooking() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [selectedCinemaId, setSelectedCinemaId] = useState("");
  const [selectedSessionId, setSelectedSessionId] = useState("");

  const movieList = useSelector(selectAllMovies);
  const movieSchedule = useSelector(selectMovieSchedule);

  console.log("movieSchedule:", movieSchedule);

  useEffect(() => {
    dispatch(fetchMoviesForBooking());
  }, [dispatch]);

  useEffect(() => {
    if (selectedMovieId) {
      console.log("CALL API WITH ID:", selectedMovieId);
      dispatch(fetchMovieSchedule(selectedMovieId));
    }
  }, [selectedMovieId]);

  const handleMovieChange = (movieId) => {
    setSelectedMovieId(movieId);
    setSelectedCinemaId("");
    setSelectedSessionId("");

    dispatch(clearSchedule());
  };

  const cinemaList = useMemo(() => {
    if (!movieSchedule?.heThongRapChieu) return [];
  
    return movieSchedule.heThongRapChieu.flatMap((htr) =>
      htr.cumRapChieu.map((cum) => ({
        maCumRap: cum.maCumRap,
        tenCumRap: cum.tenCumRap,
        tenHeThongRap: htr.tenHeThongRap,
        raw: cum,
      }))
    );
  }, [movieSchedule]);

  useEffect(() => {
    if (cinemaList.length > 0 && !selectedCinemaId) {
      setSelectedCinemaId(cinemaList[0].maCumRap);
    }
  }, [cinemaList, selectedCinemaId]);

  const sessionList = useMemo(() => {
    const cinema = cinemaList.find(
      (c) => c.maCumRap === selectedCinemaId
    );
  
    return cinema?.raw?.lichChieuPhim || [];
  }, [cinemaList, selectedCinemaId]);

  useEffect(() => {
    if (sessionList.length > 0 && !selectedSessionId) {
      setSelectedSessionId(sessionList[0].maLichChieu);
    }
  }, [sessionList, selectedSessionId]);

  return (
    <div className="quick-booking-card">

      <div className="row g-3 align-items-end">

        {/* MOVIE */}

        <div className="col-lg-4">

          <label className="form-label text-danger fw-bold text-uppercase">
            🎬 Movie
          </label>

          <select
            className="form-select bg-dark text-light border-secondary"
            value={selectedMovieId}
            onChange={(e) =>
              handleMovieChange(e.target.value)
            }
          >
            <option value="">
              Select a movie...
            </option>

            {movieList.map((movie) => (
              <option
                key={movie.maPhim}
                value={movie.maPhim}
              >
                {movie.tenPhim}
              </option>
            ))}
          </select>

        </div>

        {/* CINEMA */}

        <div className="col-lg-3">

          <label className="form-label text-danger fw-bold text-uppercase">
            📍 Cinema
          </label>

          <select
            className="form-select bg-dark text-light border-secondary"
            disabled={!selectedMovieId}
            value={selectedCinemaId}
            onChange={(e) =>
              setSelectedCinemaId(
                e.target.value
              )
            }
          >
            <option value="">
              {selectedMovieId
                ? "Select a cinema..."
                : "Choose a movie first"}
            </option>

            {cinemaList.map((cinema) => (
              <option
                key={cinema.maCumRap}
                value={cinema.maCumRap}
              >
                {cinema.tenHeThongRap} - {cinema.tenCumRap}
              </option>
            ))}
          </select>

        </div>

        {/* SHOWTIME */}

        <div className="col-lg-3">

          <label className="form-label text-danger fw-bold text-uppercase">
            ⏰ Showtime
          </label>

          <select
            className="form-select bg-dark text-light border-secondary"
            disabled={!selectedCinemaId}
            value={selectedSessionId}
            onChange={(e) =>
              setSelectedSessionId(
                e.target.value
              )
            }
          >
            <option value="">
              {selectedCinemaId
                ? "Select a showtime..."
                : "Choose a cinema first"}
            </option>

            {sessionList.map((session) => (
              <option
                key={session.maLichChieu}
                value={session.maLichChieu}
              >
                {moment(
                  session.ngayChieuGioChieu
                ).format(
                  "DD/MM/YYYY • HH:mm"
                )}
              </option>
            ))}
          </select>

        </div>

        {/* BUTTON */}

        <div className="col-lg-2">

          <button
            disabled={!selectedSessionId}
            onClick={() =>
              navigate(`/checkout/${selectedSessionId}`)
            }
            className="btn btn-danger w-100 fw-bold text-uppercase"
          >
            Book Now
          </button>

        </div>

      </div>

    </div>
  );
}

