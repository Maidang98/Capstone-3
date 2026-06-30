import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { fetchLogin } from "./slice";
import Loading from "./../../../components/Loader";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.loginReducer);

  const [user, setUser] = useState({ taiKhoan: "", matKhau: "" });
  const [errors, setErrors] = useState({ taiKhoan: "", matKhau: "" });

  const isDisableLogin =
    !user.taiKhoan ||
    !user.matKhau ||
    !!errors.taiKhoan ||
    !!errors.matKhau;

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const validationForm = (event) => {
    const { name, value } = event.target;
    setErrors((prev) => ({
      ...prev,
      [name]: value.trim() === "" ? "This field is required" : "",
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const result = await dispatch(fetchLogin(user)).unwrap();

      alert(`Login successful. Welcome back, ${result.hoTen}!`);

      if (result.maLoaiNguoiDung === "QuanTri") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-vh-100 bg-dark d-flex align-items-center justify-content-center position-relative overflow-hidden p-4">

      {loading && <Loading />}

      {/* background glow */}
      <div
        style={{
          position: "absolute",
          top: "-80px",
          left: "-80px",
          width: "250px",
          height: "250px",
          background: "rgba(220,53,69,0.15)",
          filter: "blur(80px)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-80px",
          right: "-80px",
          width: "250px",
          height: "250px",
          background: "rgba(220,53,69,0.10)",
          filter: "blur(80px)",
          borderRadius: "50%",
        }}
      />

      <div
        className="bg-dark bg-opacity-75 border border-secondary rounded-4 shadow-lg p-4 p-md-5 w-100"
        style={{ maxWidth: "420px", backdropFilter: "blur(10px)" }}
      >
        {/* Back */}
        <Link
          to="/"
          className="text-secondary text-decoration-none small d-inline-flex align-items-center gap-2 mb-3"
        >
          <i className="fa-solid fa-arrow-left"></i> Back to Home
        </Link>

        {/* Title */}
        <div className="text-center mb-4">
          <h2 className="text-white fw-bold text-uppercase">
            Sign <span className="text-danger">In</span>
          </h2>
          <p className="text-secondary small">
            Welcome back to our cinema booking system
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="alert alert-danger small">
            <i className="fa-solid fa-circle-exclamation me-2"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="d-flex flex-column gap-3">

          {/* Username */}
          <div>
            <label className="form-label text-danger small fw-bold text-uppercase">
              Username
            </label>
            <div className="input-group">
              <span className="input-group-text bg-secondary text-white border-0">
                <i className="fa-regular fa-user"></i>
              </span>
              <input
                onBlur={validationForm}
                onChange={handleOnChange}
                value={user.taiKhoan}
                name="taiKhoan"
                type="text"
                className="form-control bg-dark text-white border-secondary"
                placeholder="Enter username"
              />
            </div>
            {errors.taiKhoan && (
              <small className="text-danger">{errors.taiKhoan}</small>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="form-label text-danger small fw-bold text-uppercase">
              Password
            </label>
            <div className="input-group">
              <span className="input-group-text bg-secondary text-white border-0">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                onBlur={validationForm}
                onChange={handleOnChange}
                value={user.matKhau}
                name="matKhau"
                type="password"
                className="form-control bg-dark text-white border-secondary"
                placeholder="Password"
              />
            </div>
            {errors.matKhau && (
              <small className="text-danger">{errors.matKhau}</small>
            )}
          </div>

          {/* Button */}
          <button
            disabled={isDisableLogin || loading}
            type="submit"
            className={`btn w-100 fw-bold text-uppercase mt-2 ${
              isDisableLogin || loading ? "btn-secondary" : "btn-danger"
            }`}
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-4 border-top border-secondary pt-3">
          <span className="text-secondary small">
            Don't have an account?{" "}
            <Link to="/register" className="text-danger fw-bold">
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}