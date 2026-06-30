import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  bookTicket,
  clearSelectedSeats,
} from "../../Checkout/slice";

export default function BookingSummary() {
  const dispatch = useDispatch();

  const { maLichChieu } = useParams();

  const { selectedSeats } =
  useSelector(
    (state) => state.checkoutReducer
  );

  const totalAmount =
  selectedSeats.reduce(
      (total, seat) => total + seat.giaVe,
      0
    );

  const handleCheckout = () => {
    const ticketList =
    selectedSeats.map((seat) => ({
        maGhe: seat.maGhe,
        giaVe: seat.giaVe,
      }));

    const bookingInfo = {
      maLichChieu: Number(maLichChieu),
      danhSachVe: ticketList,
    };

    dispatch(bookTicket(bookingInfo))
      .unwrap()
      .then(() => {
        dispatch(clearSelectedSeats());
      })
      .catch((error) => {
        console.error(error);

        alert(
          error ||
            "An error occurred while processing your booking."
        );
      });
  };

  return (
    <div className="booking-summary-card position-relative">

      {/* TOTAL */}

      <div className="border-bottom border-secondary border-opacity-25 pb-4">

        <small className="text-uppercase text-secondary fw-bold d-block mb-2">
          Total Payment
        </small>

        <h2 className="fw-bold text-success mb-0">
          {totalAmount.toLocaleString()}
          <span className="fs-6 ms-2">
            VND
          </span>
        </h2>

      </div>

      {/* SEATS */}

      <div className="py-4 border-bottom border-secondary border-opacity-25">

        <div className="d-flex justify-content-between align-items-center mb-3">

          <span className="text-uppercase text-secondary fw-bold small">
            Selected Seats
          </span>

          <span className="badge bg-danger">
            {selectedSeats.length} Seats
          </span>

        </div>

        <div className="d-flex flex-wrap gap-2">

          {selectedSeats.length > 0 ? (
            selectedSeats.map(
              (seat) => (
                <span
                  key={seat.maGhe}
                  className="badge rounded-pill bg-danger-subtle text-danger border border-danger"
                >
                  {seat.tenGhe}
                </span>
              )
            )
          ) : (
            <span className="text-secondary fst-italic">
              Please select your seats...
            </span>
          )}

        </div>

      </div>

      {/* EXTRA INFO */}

      <div className="py-4">

        <div className="d-flex justify-content-between mb-2">

          <span className="text-secondary">
            Booking Method
          </span>

          <span className="fw-semibold">
            Online
          </span>

        </div>

        <div className="d-flex justify-content-between">

          <span className="text-secondary">
            Service Fee
          </span>

          <span className="fw-semibold text-success">
            Free
          </span>

        </div>

      </div>

      {/* CHECKOUT */}

      <button
        disabled={
          selectedSeats.length === 0
        }
        onClick={handleCheckout}
        className="btn btn-danger w-100 py-3 fw-bold text-uppercase"
      >
        Proceed to Payment
      </button>

      {/* FOOTNOTE */}

      <p className="text-center text-secondary small fst-italic mt-3 mb-0">
        Please review your booking details
        carefully before proceeding.
      </p>

    </div>
  );
}