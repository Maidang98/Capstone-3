import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateMovieUpload } from "./slice";
import { DatePicker } from "antd";
import dayjs from "dayjs";

export default function Edit() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { listMovie } = useSelector(
    (state) => state.filmsReducer
  );

  const movieEdit = listMovie.find(
    (item) => item.maPhim == id
  );

  const [movie, setMovie] = useState({
    maPhim: "",
    tenPhim: "",
    trailer: "",
    moTa: "",
    ngayKhoiChieu: "",
    dangChieu: false,
    sapChieu: false,
    hot: false,
    danhGia: 0,
    hinhAnh: null,
    maNhom: "GP01",
  });

  useEffect(() => {
    if (movieEdit) {
      setMovie({
        ...movieEdit,
        ngayKhoiChieu: movieEdit.ngayKhoiChieu,
      });
    }
  }, [movieEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setMovie({
      ...movie,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleChangeDate = (date, dateString) => {
    setMovie({
      ...movie,
      ngayKhoiChieu: dateString,
    });
  };

  const handleChangeFile = (e) => {
    setMovie({
      ...movie,
      hinhAnh: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!movie.maPhim) {
      alert("Movie ID not found!");
      return;
    }

    const formData = new FormData();

    for (let key in movie) {
      if (key === "hinhAnh") {
        if (movie.hinhAnh instanceof File) {
          formData.append(
            "File",
            movie.hinhAnh,
            movie.hinhAnh.name
          );
        }
      } else if (key === "ngayKhoiChieu") {
        const dateFormatted = dayjs(
          movie.ngayKhoiChieu
        ).format("DD/MM/YYYY");

        formData.append(key, dateFormatted);
      } else if (key === "maNhom") {
        formData.append(key, "GP01");
      } else {
        formData.append(key, movie[key]);
      }
    }

    dispatch(updateMovieUpload(formData))
      .unwrap()
      .then(() => {
        alert("Movie updated successfully!");
        navigate("/admin/films");
      })
      .catch((err) => {
        console.error(err);
        alert(
          typeof err === "string"
            ? err
            : "Failed to update movie."
        );
      });
  };

  return (
    <div className="container py-4">
      <div className="card bg-dark text-light border-secondary shadow-lg">
        <div className="card-body p-4">

          {/* Header */}
          <div className="d-flex align-items-center mb-4 border-bottom border-secondary pb-3">

            <div
              className="d-flex justify-content-center align-items-center rounded bg-primary bg-opacity-25 me-3"
              style={{
                width: "50px",
                height: "50px",
              }}
            >
              <i className="fa-solid fa-pen text-primary fs-4"></i>
            </div>

            <div>
              <h2 className="fw-bold mb-0">
                Update Movie
              </h2>

              <small className="text-secondary">
                Movie ID: {id}
              </small>
            </div>

          </div>

          <form onSubmit={handleSubmit}>

            {/* Movie Title */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Movie Title
              </label>

              <input
                type="text"
                name="tenPhim"
                value={movie.tenPhim}
                className="form-control"
                onChange={handleChange}
              />
            </div>

            {/* Trailer */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Trailer URL
              </label>

              <input
                type="text"
                name="trailer"
                value={movie.trailer}
                className="form-control"
                onChange={handleChange}
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Description
              </label>

              <textarea
                rows="4"
                name="moTa"
                value={movie.moTa}
                className="form-control"
                onChange={handleChange}
              />
            </div>

            {/* Release Date */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Release Date
              </label>

              <DatePicker
                format="DD/MM/YYYY"
                className="w-100"
                value={
                  movie.ngayKhoiChieu
                    ? dayjs(movie.ngayKhoiChieu)
                    : null
                }
                onChange={handleChangeDate}
              />
            </div>

            {/* Rating */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Rating
              </label>

              <input
                type="number"
                min="0"
                max="10"
                name="danhGia"
                value={movie.danhGia}
                className="form-control"
                onChange={handleChange}
              />
            </div>

            {/* Status */}
            <div className="border rounded p-3 mb-3">

              <h6 className="fw-bold mb-3">
                Movie Status
              </h6>

              <div className="form-check mb-2">
                <input
                  type="checkbox"
                  name="dangChieu"
                  checked={movie.dangChieu}
                  className="form-check-input"
                  onChange={handleChange}
                />

                <label className="form-check-label">
                  Now Showing
                </label>
              </div>

              <div className="form-check mb-2">
                <input
                  type="checkbox"
                  name="sapChieu"
                  checked={movie.sapChieu}
                  className="form-check-input"
                  onChange={handleChange}
                />

                <label className="form-check-label">
                  Coming Soon
                </label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  name="hot"
                  checked={movie.hot}
                  className="form-check-input"
                  onChange={handleChange}
                />

                <label className="form-check-label">
                  Featured Movie 🔥
                </label>
              </div>

            </div>

            {/* Current Poster */}
            <div className="card bg-secondary bg-opacity-10 border-secondary mb-3">
              <div className="card-body">

                <label className="form-label fw-semibold">
                  Current Poster
                </label>

                <div>
                  <img
                    src={movieEdit?.hinhAnh}
                    alt={movie.tenPhim}
                    className="img-thumbnail"
                    style={{
                      width: "180px",
                      objectFit: "cover",
                    }}
                  />
                </div>

              </div>
            </div>

            {/* Upload New Poster */}
            <div className="mb-4">
              <label className="form-label fw-semibold">
                Upload New Poster
              </label>

              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handleChangeFile}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              <i className="fa-solid fa-arrows-rotate me-2"></i>
              Update Movie
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

