import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../Login/slice";

export default function AdminHeader() {
  const dispatch = useDispatch();

  const { userLogin } = useSelector(
    (state) => state.loginReducer
  );

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      dispatch(logOut());
    }
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-black border-bottom border-secondary px-4 shadow-sm">

      {/* Logo */}
      <NavLink
        className="navbar-brand fw-bold fs-4"
        to="/admin"
      >
        UY <span className="text-danger">Cinema</span>
        <span className="text-secondary fs-6 ms-2">
          Admin
        </span>
      </NavLink>

      {/* Right Side */}
      <div className="ms-auto d-flex align-items-center gap-3">

        <button className="btn btn-dark position-relative">
          <i className="fa-regular fa-bell"></i>

          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          >
            3
          </span>
        </button>

        <button className="btn btn-dark">
          <i className="fa-solid fa-gear"></i>
        </button>

        <div className="dropdown">

          <button
            className="btn btn-dark dropdown-toggle d-flex align-items-center gap-2"
            data-bs-toggle="dropdown"
          >
            <div
              className="bg-danger rounded-circle d-flex justify-content-center align-items-center fw-bold"
              style={{
                width: 35,
                height: 35,
              }}
            >
              {userLogin?.hoTen?.charAt(0)}
            </div>

            {userLogin?.hoTen}
          </button>

          <ul className="dropdown-menu dropdown-menu-end">

            <li>
              <button
                className="dropdown-item"
              >
                Profile
              </button>
            </li>

            <li>
              <button
                className="dropdown-item"
              >
                Settings
              </button>
            </li>

            <li>
              <hr className="dropdown-divider" />
            </li>

            <li>
              <button
                className="dropdown-item text-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>

          </ul>

        </div>

      </div>

    </nav>
  );
}