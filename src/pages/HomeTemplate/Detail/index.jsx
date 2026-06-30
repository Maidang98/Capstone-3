import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetail } from "./slice";
import LichChieuDetail from "../_components/ShowtimesDetail";
import Loader from "../_components/Loader";

export default function MovieDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movieId } = useParams();

  const { loading, data } = useSelector(
    (state) => state.movieDetailReducer
  );

  const detail = data?.detail;
  const schedule = data?.schedule;

  const handleBooking = (scheduleId) => {
    if (scheduleId) navigate(`/checkout/${scheduleId}`);
    else alert("This movie currently has no available showtimes.");
  };

  const firstScheduleId =
    schedule?.heThongRapChieu?.[0]
      ?.cumRapChieu?.[0]
      ?.lichChieuPhim?.[0]
      ?.maLichChieu;

  useEffect(() => {
    if (movieId) dispatch(fetchMovieDetail(movieId));
    window.scrollTo(0, 0);
  }, [movieId, dispatch]);

  if (loading) return <Loader />;

  if (!data) {
    return (
      <div className="bg-black text-white vh-100 d-flex justify-content-center align-items-center">
        Movie not found.
      </div>
    );
  }

  return (
    <div className="bg-black text-light pb-5">

      {/* BACKDROP */}
      <div className="position-relative w-100" style={{ height: "400px", overflow: "hidden" }}>

        <img
          src={detail?.hinhAnh}
          alt="backdrop"
          className="w-100 h-100"
          style={{
            objectFit: "cover",
            filter: "blur(20px)",
            opacity: 0.3,
            transform: "scale(1.1)",
          }}
        />

        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: "linear-gradient(to top, #000, transparent)",
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="container" style={{ marginTop: "-150px", position: "relative" }}>

        <div className="row g-4">

          {/* POSTER */}
          <div className="col-12 col-md-4 text-center text-md-start">

            <img
              src={detail?.hinhAnh}
              alt={detail?.tenPhim}
              className="img-fluid rounded-4 border border-secondary shadow"
            />

            <button
              onClick={() => handleBooking(firstScheduleId)}
              className="btn btn-danger fw-bold w-100 mt-4"
            >
              Book Now
            </button>

          </div>

          {/* INFO */}
          <div className="col-12 col-md-8">

            <h1 className="fw-black text-uppercase display-5">
              {detail?.tenPhim}
            </h1>

            <div className="d-flex gap-3 align-items-center mb-3 flex-wrap">

              <span className="badge bg-danger">C18</span>

              <span className="text-warning fw-bold">
                ★ {detail?.danhGia}/10
              </span>

              <span className="text-secondary">
                {new Date(detail?.ngayKhoiChieu).getFullYear()}
              </span>

            </div>

            <div className="bg-dark border border-secondary rounded-4 p-4">

              <h6 className="text-danger text-uppercase fw-bold">
                Overview
              </h6>

              <p className="text-secondary fst-italic mb-0">
                {detail?.moTa || "No description available."}
              </p>

            </div>

          </div>

        </div>

        {/* SHOWTIME */}
        <div className="mt-5">

          <h3 className="border-start border-danger border-4 ps-3 fw-bold text-uppercase">
            Showtimes
          </h3>

          {schedule?.heThongRapChieu?.length > 0 ? (
            <div className="row mt-4 border border-secondary rounded-4 overflow-hidden">

              {/* CINEMA LIST */}
              <div className="col-12 col-lg-3 bg-dark border-end border-secondary p-3">

                <div className="d-flex d-lg-block overflow-auto">

                  {schedule.heThongRapChieu.map((cinema) => (
                    <button
                      key={cinema.maHeThongRap}
                      className="btn btn-dark w-100 mb-2 text-start d-flex align-items-center gap-2"
                    >
                      <img
                        src={cinema.logo}
                        alt={cinema.tenHeThongRap}
                        width="30"
                        height="30"
                      />
                      <small className="text-secondary">
                        {cinema.tenHeThongRap}
                      </small>
                    </button>
                  ))}

                </div>

              </div>

              {/* SHOWTIME LIST */}
              <div className="col-12 col-lg-9 p-4">

                {schedule.heThongRapChieu[0]?.cumRapChieu.map((cinemaGroup) => (
                  <div key={cinemaGroup.maCumRap} className="mb-4">

                    <h5 className="text-danger fw-bold mb-3">
                      {cinemaGroup.tenCumRap}
                    </h5>

                    <LichChieuDetail
                      lichChieu={cinemaGroup.lichChieuPhim}
                      handleBooking={handleBooking}
                    />

                  </div>
                ))}

              </div>

            </div>
          ) : (
            <div className="text-center text-secondary py-5">
              No showtimes available.
            </div>
          )}

        </div>

      </div>

    </div>
  );
}