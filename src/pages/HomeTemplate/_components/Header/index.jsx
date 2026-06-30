import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../Login/slice";

export default function Header() {
  const dispatch = useDispatch();
  const { userLogin } = useSelector((state) => state.loginReducer);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logOut());
    setOpen(false);
  };

  const navClass = ({ isActive }) =>
    `nav-link ${isActive ? "active text-danger fw-bold" : "text-light"}`;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black border-bottom border-dark sticky-top py-3">
      <div className="container">

        {/* Logo */}
        <NavLink className="navbar-brand fw-bold fs-2" to="/">
          UY <span className="text-danger">Cinema</span>
        </NavLink>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler"
          onClick={() => setOpen(!open)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>

          <ul className="navbar-nav me-auto mb-2 mb-lg-0 fs-4">

            <li className="nav-item">
              <NavLink to="/" end className={navClass}>
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/list-movie" className={navClass}>
                Movies
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/booking" className={navClass}>
                Booking
              </NavLink>
            </li>

          </ul>

          {/* User */}
          <div className="d-flex align-items-center gap-3">

            {!userLogin ? (
              <>
                <NavLink className="text-light text-decoration-none" to="/login">
                  Sign In
                </NavLink>

                <NavLink className="btn btn-danger rounded-pill px-4" to="/register">
                  Register
                </NavLink>
              </>
            ) : (
              <div className="dropdown">

                <button
                  className="btn btn-dark dropdown-toggle d-flex align-items-center gap-2"
                  data-bs-toggle="dropdown"
                >
                  <div className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: 35, height: 35 }}
                  >
                    {userLogin.hoTen?.charAt(0).toUpperCase()}
                  </div>

                  {userLogin.hoTen}
                </button>

                <ul className="dropdown-menu dropdown-menu-end bg-dark border-secondary">

                  <li>
                    <NavLink className="dropdown-item text-light" to="/profile">
                      Profile
                    </NavLink>
                  </li>

                  <li>
                    <NavLink className="dropdown-item text-light" to="/my-tickets">
                      My Tickets
                    </NavLink>
                  </li>

                  {userLogin.maLoaiNguoiDung === "QuanTri" && (
                    <li>
                      <NavLink className="dropdown-item text-warning" to="/admin">
                        Dashboard
                      </NavLink>
                    </li>
                  )}

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
            )}

          </div>

        </div>
      </div>
    </nav>
  );
}