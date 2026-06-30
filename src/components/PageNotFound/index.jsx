import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-vh-100 bg-dark d-flex flex-column align-items-center justify-content-center text-center p-4 position-relative overflow-hidden">

      {/* 404 visual block */}
      <div className="position-relative" style={{ animation: "fadeIn 0.6s ease" }}>

        <h1
          className="fw-black text-secondary user-select-none"
          style={{
            fontSize: "clamp(120px, 15vw, 200px)",
            letterSpacing: "-5px",
          }}
        >
          404
        </h1>

        {/* Center icon */}
        <div className="position-absolute top-50 start-50 translate-middle">
          <div className="position-relative text-danger">

            <i
              className="fa-solid fa-film"
              style={{
                fontSize: "5rem",
                filter: "drop-shadow(0 0 25px rgba(220,53,69,0.6))",
                animation: "pulse 1.5s infinite",
              }}
            />

            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "120%",
                height: "2px",
                backgroundColor: "#111",
                transform: "translate(-50%, -50%) rotate(45deg)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Text content */}
      <div className="mt-3 text-white position-relative" style={{ zIndex: 2, animation: "fadeIn 0.8s ease" }}>

        <h2 className="fw-bold mb-3">
          Oops! Signal Lost...
        </h2>

        <p className="text-secondary mx-auto" style={{ maxWidth: "520px", fontSize: "0.95rem" }}>
          The page you’re looking for may have been removed, renamed, or is temporarily unavailable.
          Please check the URL or return to the <span className="text-white fw-bold">BC92<span className="text-danger">MOVIE</span></span> platform.
        </p>

        {/* Buttons */}
        <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mt-4">

          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline-light px-4 py-2 d-flex align-items-center justify-content-center gap-2"
          >
            <i className="fa-solid fa-arrow-left-long"></i>
            Go Back
          </button>

          <NavLink
            to="/"
            className="btn btn-danger px-4 py-2 d-flex align-items-center justify-content-center gap-2"
          >
            <i className="fa-solid fa-house"></i>
            Back to Home
          </NavLink>

        </div>
      </div>

      {/* background overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 70%, #000 100%)",
          opacity: 0.9,
          zIndex: 0,
        }}
      />

      {/* simple CSS animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>

    </div>
  );
}