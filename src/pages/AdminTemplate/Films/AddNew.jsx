import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMovieUpload } from "./slice";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "antd";

export default function AddNew() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setMovie((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleChangeFile = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setMovie((prev) => ({
        ...prev,
        hinhAnh: file,
      }));
    }
  };

  const handleDateChange = (date, dateString) => {
    setMovie((prev) => ({
      ...prev,
      ngayKhoiChieu: dateString,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(movie).forEach(([key, value]) => {
      if (key === "hinhAnh") {
        if (value) {
          formData.append("File", value, value.name);
        }
      } else {
        formData.append(key, value);
      }
    });

    dispatch(addMovieUpload(formData))
      .unwrap()
      .then(() => {
        alert("Movie created successfully!");
        navigate("/admin/films");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="container py-4">
      <div className="card bg-dark text-light border-secondary shadow-lg">
        <div className="card-body p-4">

          {/* Header */}
          <div className="d-flex align-items-center mb-4 border-bottom border-secondary pb-3">
            <div
              className="d-flex justify-content-center align-items-center rounded bg-success bg-opacity-25 me-3"
              style={{ width: "50px", height: "50px" }}
            >
              <i className="fa-solid fa-video text-success fs-4"></i>
            </div>

            <div>
              <h2 className="fw-bold mb-0">
                Add New Movie
              </h2>
              <small className="text-secondary">
                Create a new movie record for the system.
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
                className="form-control"
                placeholder="Enter movie title..."
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
                className="form-control"
                placeholder="https://youtube.com/..."
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
                className="form-control"
                placeholder="Enter movie description..."
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
                onChange={handleDateChange}
              />
            </div>

            {/* Movie Status */}
            <div className="border rounded p-3 mb-3">

              <h6 className="fw-bold mb-3">
                Movie Status
              </h6>

              <div className="form-check mb-2">
                <input
                  type="checkbox"
                  name="dangChieu"
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
                  className="form-check-input"
                  onChange={handleChange}
                />

                <label className="form-check-label">
                  Featured Movie 🔥
                </label>
              </div>

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
                className="form-control"
                placeholder="Enter movie rating..."
                onChange={handleChange}
              />
            </div>

            {/* Poster Upload */}
            <div className="mb-4">
              <label className="form-label fw-semibold">
                Movie Poster
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
              className="btn btn-success w-100"
            >
              <i className="fa-solid fa-cloud-arrow-up me-2"></i>
              Create Movie
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

