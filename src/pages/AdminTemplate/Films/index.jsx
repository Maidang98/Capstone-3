import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchListMovieAdmin, deleteMovie } from "./slice";

export default function Films() {
  const dispatch = useDispatch();

  const { listMovie, loading } = useSelector(
    (state) => state.filmsReducer
  );

  useEffect(() => {
    dispatch(fetchListMovieAdmin());
  }, [dispatch]);

  const handleDelete = (maPhim) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie?"
    );

    if (!confirmDelete) return;

    dispatch(deleteMovie(maPhim))
      .unwrap()
      .then(() => {
        alert("Movie deleted successfully!");
        dispatch(fetchListMovieAdmin());
      })
      .catch((error) => {
        alert(error || "Failed to delete movie.");
      });
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">

          <div
            className="spinner-border text-danger"
            role="status"
            style={{
              width: "3rem",
              height: "3rem",
            }}
          >
            <span className="visually-hidden">
              Loading...
            </span>
          </div>

          <p className="mt-3 text-secondary">
            Loading movie database...
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">

      {/* Header */}
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mb-4 gap-3">

        <div>
          <h2 className="fw-bold text-light mb-1">
            Movie Management
          </h2>

          <p className="text-secondary mb-0">
            Manage all movies available in the system.
          </p>
        </div>

        <NavLink
          to="/admin/films/addnew"
          className="btn btn-danger"
        >
          <i className="fa-solid fa-plus me-2"></i>
          Add New Movie
        </NavLink>

      </div>

      {/* Statistics */}
      <div className="row g-3 mb-4">

        <div className="col-md-4">
          <div className="card bg-dark border-secondary text-light shadow-sm">
            <div className="card-body">

              <h6 className="text-secondary">
                Total Movies
              </h6>

              <h3 className="fw-bold mb-0">
                {listMovie?.length || 0}
              </h3>

            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-dark border-secondary text-light shadow-sm">
            <div className="card-body">

              <h6 className="text-secondary">
                Now Showing
              </h6>

              <h3 className="fw-bold mb-0 text-success">
                {
                  listMovie?.filter(
                    (movie) => movie.dangChieu
                  ).length
                }
              </h3>

            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-dark border-secondary text-light shadow-sm">
            <div className="card-body">

              <h6 className="text-secondary">
                Featured Movies
              </h6>

              <h3 className="fw-bold mb-0 text-warning">
                {
                  listMovie?.filter(
                    (movie) => movie.hot
                  ).length
                }
              </h3>

            </div>
          </div>
        </div>

      </div>

      {/* Movie Table */}
      <div className="card bg-dark border-secondary shadow-lg">

        <div className="card-header border-secondary">
          <h5 className="mb-0 text-light">
            Movie List
          </h5>
        </div>

        <div className="card-body p-0">

          <div className="table-responsive">

            <table className="table table-dark table-hover align-middle mb-0">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Poster</th>
                  <th>Movie Title</th>
                  <th>Rating</th>
                  <th>Status</th>
                  <th>Description</th>
                  <th className="text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>

                {listMovie?.map((movie) => (
                  <tr key={movie.maPhim}>

                    <td className="fw-bold">
                      #{movie.maPhim}
                    </td>

                    <td>
                      <img
                        src={movie.hinhAnh}
                        alt={movie.tenPhim}
                        className="rounded border"
                        style={{
                          width: "70px",
                          height: "90px",
                          objectFit: "cover",
                        }}
                      />
                    </td>

                    <td>
                      <div className="fw-semibold">
                        {movie.tenPhim}
                      </div>
                    </td>

                    <td>
                      <span className="badge bg-warning text-dark">
                        ⭐ {movie.danhGia}
                      </span>
                    </td>

                    <td>

                      {movie.dangChieu && (
                        <span className="badge bg-success me-1">
                          Now Showing
                        </span>
                      )}

                      {movie.sapChieu && (
                        <span className="badge bg-info me-1">
                          Coming Soon
                        </span>
                      )}

                      {movie.hot && (
                        <span className="badge bg-danger">
                          HOT
                        </span>
                      )}

                    </td>

                    <td
                      style={{
                        maxWidth: "280px",
                      }}
                    >
                      {movie.moTa?.length > 120
                        ? movie.moTa.slice(0, 120) +
                          "..."
                        : movie.moTa}
                    </td>

                    <td className="text-center">

                      <NavLink
                        to={`/admin/films/edit/${movie.maPhim}`}
                        className="btn btn-sm btn-primary me-2"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </NavLink>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() =>
                          handleDelete(movie.maPhim)
                        }
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
}
