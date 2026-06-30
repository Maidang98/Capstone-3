import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { fetchRegister, resetRegisterState } from "./slice";
import Loading from "./../../../components/Loading";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, success } = useSelector(
    (state) => state.registerReducer
  );

  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    email: "",
    soDt: "",
  });

  const [errors, setErrors] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    email: "",
    soDt: "",
  });

  const isDisableRegister =
    Object.values(user).some((val) => val === "") ||
    Object.values(errors).some((val) => val !== "");

  useEffect(() => {
    dispatch(resetRegisterState());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      alert("Registration successful! Please sign in to continue.");
      navigate("/login");
    }
  }, [success, navigate]);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const validationForm = (event) => {
    const { name, value } = event.target;
    let mess = value.trim() === "" ? "This field is required" : "";

    if (value.trim() !== "") {
      switch (name) {
        case "hoTen":
          if (value.trim().length < 2)
            mess = "Full name must be at least 2 characters long";
          break;
        case "taiKhoan":
          if (value.length < 4)
            mess = "Username must be at least 4 characters long";
          break;
        case "matKhau":
          const passRegex =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!\s).{6,}$/;
          if (!value.match(passRegex))
            mess =
              "Password must contain uppercase, lowercase, number, special character and at least 6 characters";
          break;
        case "email":
          const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (!value.match(emailRegex)) mess = "Invalid email format";
          break;
        case "soDt":
          const phoneRegex = /^[0-9]+$/;
          if (!value.match(phoneRegex))
            mess = "Phone number must contain digits only";
          break;
        default:
          break;
      }
    }

    setErrors((prev) => ({ ...prev, [name]: mess }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      await dispatch(fetchRegister(user)).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-vh-100 bg-dark d-flex align-items-center justify-content-center position-relative overflow-hidden p-4">
      {loading && <Loading />}

      {/* background glow (bootstrap replacement minimal) */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          left: "-100px",
          width: "300px",
          height: "300px",
          background: "rgba(220,53,69,0.15)",
          filter: "blur(80px)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          right: "-100px",
          width: "300px",
          height: "300px",
          background: "rgba(13,110,253,0.15)",
          filter: "blur(80px)",
          borderRadius: "50%",
        }}
      />

      <div className="container">
        <div className="bg-dark bg-opacity-75 border border-secondary rounded-4 shadow-lg p-4 p-md-5 mx-auto"
             style={{ maxWidth: "720px", backdropFilter: "blur(10px)" }}>

          {/* Back */}
          <Link
            to="/"
            className="text-secondary text-decoration-none small d-inline-flex align-items-center gap-2 mb-3"
          >
            <i className="fa-solid fa-arrow-left"></i> Back to Homepage
          </Link>

          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="text-white fw-bold text-uppercase">
              Create <span className="text-danger">Account</span>
            </h2>
            <p className="text-secondary small">
              Create an account and enjoy cinema experience.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="alert alert-danger small">
              <i className="fa-solid fa-circle-exclamation me-2"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleRegister}>
            <div className="row g-3">

              {/* Full Name */}
              <div className="col-12">
                <label className="form-label text-danger small fw-bold text-uppercase">
                  Full Name
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-secondary text-white border-0">
                    <i className="fa-regular fa-address-card"></i>
                  </span>
                  <input
                    name="hoTen"
                    value={user.hoTen}
                    onChange={handleOnChange}
                    onBlur={validationForm}
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.hoTen && (
                  <small className="text-danger">{errors.hoTen}</small>
                )}
              </div>

              {/* Username */}
              <div className="col-md-6">
                <label className="form-label text-danger small fw-bold text-uppercase">
                  Username
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-secondary text-white border-0">
                    <i className="fa-regular fa-user"></i>
                  </span>
                  <input
                    name="taiKhoan"
                    value={user.taiKhoan}
                    onChange={handleOnChange}
                    onBlur={validationForm}
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="Username"
                  />
                </div>
                {errors.taiKhoan && (
                  <small className="text-danger">{errors.taiKhoan}</small>
                )}
              </div>

              {/* Password */}
              <div className="col-md-6">
                <label className="form-label text-danger small fw-bold text-uppercase">
                  Password
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-secondary text-white border-0">
                    <i className="fa-solid fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    name="matKhau"
                    value={user.matKhau}
                    onChange={handleOnChange}
                    onBlur={validationForm}
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="Password"
                  />
                </div>
                {errors.matKhau && (
                  <small className="text-danger">{errors.matKhau}</small>
                )}
              </div>

              {/* Email */}
              <div className="col-md-6">
                <label className="form-label text-danger small fw-bold text-uppercase">
                  Email
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-secondary text-white border-0">
                    <i className="fa-regular fa-envelope"></i>
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleOnChange}
                    onBlur={validationForm}
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="Email"
                  />
                </div>
                {errors.email && (
                  <small className="text-danger">{errors.email}</small>
                )}
              </div>

              {/* Phone */}
              <div className="col-md-6">
                <label className="form-label text-danger small fw-bold text-uppercase">
                  Phone
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-secondary text-white border-0">
                    <i className="fa-solid fa-mobile-screen"></i>
                  </span>
                  <input
                    name="soDt"
                    value={user.soDt}
                    onChange={handleOnChange}
                    onBlur={validationForm}
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="Phone number"
                  />
                </div>
                {errors.soDt && (
                  <small className="text-danger">{errors.soDt}</small>
                )}
              </div>

              {/* Button */}
              <div className="col-12 mt-3">
                <button
                  disabled={isDisableRegister || loading}
                  className={`btn w-100 fw-bold text-uppercase ${
                    isDisableRegister || loading
                      ? "btn-secondary"
                      : "btn-danger"
                  }`}
                >
                  Create Account
                </button>
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="text-center mt-4 border-top border-secondary pt-3">
            <span className="text-secondary small">
              Already have an account?{" "}
              <Link to="/login" className="text-danger fw-bold">
                Sign In
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}