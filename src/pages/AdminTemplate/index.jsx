import React, { useState } from "react";
import { Outlet, Navigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import AdminHeader from "./_components/Header";
import AdminFooter from "./_components/Footer";

export default function AdminTemplate() {
const [showSidebar, setShowSidebar] = useState(false);

const { data } = useSelector(
(state) => state.authReducer
);

if (!data) {
return <Navigate to="/login" replace />;
}

if (data.maLoaiNguoiDung !== "QuanTri") {
return <Navigate to="/" replace />;
}

const closeSidebar = () => {
setShowSidebar(false);
};

return (
<>
{/* Mobile Overlay */}
{showSidebar && (
<div
className="position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50 d-lg-none"
style={{ zIndex: 1040 }}
onClick={closeSidebar}
/>
)}

```
  <div
    className="d-flex bg-dark text-light"
    style={{ minHeight: "100vh" }}
  >
    {/* Sidebar */}
    <aside
      className={`bg-black border-end border-secondary position-fixed position-lg-static h-100 ${
        showSidebar ? "d-block" : "d-none d-lg-block"
      }`}
      style={{
        width: "260px",
        zIndex: 1050,
      }}
    >
      {/* Logo */}
      <div className="p-4 border-bottom border-secondary d-flex justify-content-between align-items-center">

        <h4 className="fw-bold mb-0">
          UY <span className="text-danger">Cinema</span>
        </h4>

        <button
          className="btn btn-sm btn-outline-light d-lg-none"
          onClick={closeSidebar}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

      </div>

      {/* Navigation */}
      <nav className="p-3">

        <div className="text-uppercase text-secondary small fw-bold mb-3">
          Administration
        </div>

        <ul className="nav flex-column gap-2">

          <li className="nav-item">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `nav-link rounded px-3 py-2 ${
                  isActive
                    ? "bg-danger text-white"
                    : "text-light"
                }`
              }
              onClick={closeSidebar}
            >
              <i className="fa-solid fa-chart-line me-2"></i>
              Dashboard
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/admin/films"
              className={({ isActive }) =>
                `nav-link rounded px-3 py-2 ${
                  isActive
                    ? "bg-danger text-white"
                    : "text-light"
                }`
              }
              onClick={closeSidebar}
            >
              <i className="fa-solid fa-film me-2"></i>
              Movie Management
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/admin/user"
              className={({ isActive }) =>
                `nav-link rounded px-3 py-2 ${
                  isActive
                    ? "bg-danger text-white"
                    : "text-light"
                }`
              }
              onClick={closeSidebar}
            >
              <i className="fa-solid fa-users me-2"></i>
              User Management
            </NavLink>
          </li>

        </ul>

      </nav>

      {/* Footer Sidebar */}
      <div className="mt-auto p-3 border-top border-secondary">

        <NavLink
          to="/"
          className="nav-link text-secondary"
        >
          <i className="fa-solid fa-arrow-left me-2"></i>
          Back to Website
        </NavLink>

      </div>

    </aside>

    {/* Main Content */}
    <div
      className="flex-grow-1 d-flex flex-column"
      style={{
        marginLeft:
          window.innerWidth >= 992
            ? "260px"
            : "0",
      }}
    >
      {/* Header */}
      <div className="sticky-top">

        <div className="bg-black border-bottom border-secondary">

          <div className="container-fluid">

            <div className="d-flex align-items-center py-2">

              <button
                className="btn btn-dark d-lg-none me-3"
                onClick={() =>
                  setShowSidebar(true)
                }
              >
                <i className="fa-solid fa-bars"></i>
              </button>

              <div className="flex-grow-1">
                <AdminHeader />
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Content */}
      <main className="flex-grow-1 p-4">

        <div className="container-fluid">

          <Outlet />

        </div>

      </main>

      {/* Footer */}
      <AdminFooter />

    </div>
  </div>
</>

);
}
