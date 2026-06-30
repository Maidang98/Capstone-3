import React from "react";
import QuickBooking from "../_components/QuickBooking";

export default function Booking() {
  return (
    <div className="bg-black text-light min-vh-100 pt-5 pb-5">

      {/* Header */}
      <div className="container text-center mb-5 pt-5">

        <h1 className="display-4 fw-black text-uppercase fst-italic">
          Quick <span className="text-danger">Booking</span>
        </h1>

        <div
          className="bg-danger mx-auto my-4 rounded"
          style={{
            width: 80,
            height: 6,
            boxShadow: "0 0 15px rgba(220,38,38,0.5)",
          }}
        />

        <p className="text-secondary mx-auto" style={{ maxWidth: "520px" }}>
          Skip the wait. Select your favorite movie and cinema location in just a few simple steps.
        </p>

      </div>

      {/* Booking Form */}
      <div className="container">
        <div className="position-relative">

          {/* Glow effect (Bootstrap + inline CSS replacement) */}
          <div
            className="position-absolute top-0 start-0 w-100 h-100 rounded-5"
            style={{
              background:
                "linear-gradient(90deg, rgba(220,38,38,0.2), rgba(0,0,0,0))",
              filter: "blur(40px)",
              opacity: 0.6,
              zIndex: 0,
            }}
          ></div>

          <div className="position-relative z-1">
            <QuickBooking />
          </div>

        </div>
      </div>

      {/* Decorative Text */}
      <div className="text-center mt-5 d-none d-md-block opacity-25 user-select-none">
        <h1
          className="fw-bold text-uppercase"
          style={{
            fontSize: "6rem",
            letterSpacing: "-2px",
          }}
        >
          Quick Booking
        </h1>
      </div>

    </div>
  );
}