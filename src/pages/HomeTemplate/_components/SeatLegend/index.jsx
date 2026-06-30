import React from "react";

const legendItems = [
  {
    className: "bg-danger text-white",
    text: "Available Seat",
    icon: null,
  },
  {
    className: "bg-warning text-dark",
    text: "Selected Seat",
    icon: null,
  },
  {
    className: "bg-secondary text-light border border-secondary",
    text: "Reserved Seat",
    icon: <i className="fa-solid fa-xmark"></i>,
  },
];

export default function SeatLegend() {
  return (
    <div className="seat-legend-card">

      <div className="row justify-content-center g-4">

        {legendItems.map((item, index) => (
          <div
            key={index}
            className="col-auto"
          >
            <div className="d-flex align-items-center">

              {/* Seat Box */}
              <div
                className={`seat-legend-icon ${item.className}`}
              >
                {item.icon}
              </div>

              {/* Text */}
              <span className="seat-legend-text">
                {item.text}
              </span>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}