import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import { actAuth } from "./slice";
import Loading from "../_components/Loader";

export default function Auth() {
const dispatch = useDispatch();
const navigate = useNavigate();

const { loading, data, error } = useSelector(
(state) => state.authReducer
);

const [user, setUser] = useState({
taiKhoan: "",
matKhau: "",
});

const [errors, setErrors] = useState({
taiKhoan: "",
matKhau: "",
});

const handleChange = (e) => {
const { name, value } = e.target;

setUser((prev) => ({
  ...prev,
  [name]: value,
}));

};

const validateField = (e) => {
const { name, value } = e.target;

let message = "";

if (!value.trim()) {
  message = `${name} is required`;
}

if (name === "taiKhoan" && value.trim().length > 0 && value.trim().length < 4) {
  message = "Username must contain at least 4 characters";
}

setErrors((prev) => ({
  ...prev,
  [name]: message,
}));

};

const handleLogin = (e) => {
e.preventDefault();
dispatch(actAuth(user));
};

const isDisabled =
!user.taiKhoan ||
!user.matKhau ||
errors.taiKhoan ||
errors.matKhau;

if (data) {
return <Navigate to="/admin/dashboard" replace />;
}

if (loading) {
return <Loading />;
}

return (
<div
className="bg-dark d-flex align-items-center justify-content-center"
style={{ minHeight: "100vh" }}
>
<div
className="card bg-black border-secondary shadow-lg"
style={{
width: "100%",
maxWidth: "450px",
}}
> <div className="card-body p-5">

      <div className="text-center mb-4">

        <div
          className="d-inline-flex align-items-center justify-content-center rounded-circle bg-danger bg-opacity-10 mb-3"
          style={{
            width: "70px",
            height: "70px",
          }}
        >
          <i className="fa-solid fa-shield-halved text-danger fs-3"></i>
        </div>

        <h2 className="fw-bold text-light">
          Admin Portal
        </h2>

        <p className="text-secondary mb-0">
          Sign in to access the administration dashboard.
        </p>

      </div>

      {error && (
        <div className="alert alert-danger">
          {typeof error === "string"
            ? error
            : error?.response?.data?.content}
        </div>
      )}

      <form onSubmit={handleLogin}>

        <div className="mb-3">

          <label className="form-label text-light">
            Username
          </label>

          <div className="input-group">

            <span className="input-group-text bg-dark border-secondary text-secondary">
              <i className="fa-solid fa-user"></i>
            </span>

            <input
              type="text"
              name="taiKhoan"
              value={user.taiKhoan}
              onChange={handleChange}
              onBlur={validateField}
              className="form-control bg-dark text-light border-secondary"
              placeholder="Enter username"
            />

          </div>

          {errors.taiKhoan && (
            <small className="text-danger">
              {errors.taiKhoan}
            </small>
          )}

        </div>

        <div className="mb-4">

          <label className="form-label text-light">
            Password
          </label>

          <div className="input-group">

            <span className="input-group-text bg-dark border-secondary text-secondary">
              <i className="fa-solid fa-lock"></i>
            </span>

            <input
              type="password"
              name="matKhau"
              value={user.matKhau}
              onChange={handleChange}
              onBlur={validateField}
              className="form-control bg-dark text-light border-secondary"
              placeholder="Enter password"
            />

          </div>

          {errors.matKhau && (
            <small className="text-danger">
              {errors.matKhau}
            </small>
          )}

        </div>

        <button
          type="submit"
          disabled={isDisabled}
          className="btn btn-danger w-100 py-3 fw-bold"
        >
          <i className="fa-solid fa-right-to-bracket me-2"></i>
          Sign In
        </button>

      </form>

      <div className="text-center mt-4">

        <button
          type="button"
          className="btn btn-link text-secondary text-decoration-none"
          onClick={() => navigate("/")}
        >
          <i className="fa-solid fa-arrow-left me-2"></i>
          Back to Website
        </button>

      </div>

    </div>
  </div>
</div>

);
}
