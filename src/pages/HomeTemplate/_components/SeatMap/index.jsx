import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSeat } from "../../Checkout/slice";

export default function SeatMap() {
  const dispatch = useDispatch();

  const {
    roomDetail,
    selectedSeats,
  } = useSelector(
    (state) => state.checkoutReducer
  );

  const { danhSachGhe } =
  roomDetail || {};

  return (
    <div className="seat-map-container">

      {danhSachGhe?.map((seat) => {
        const isSelected =
        selectedSeats.some(
            (item) =>
              item.maGhe === seat.maGhe
          );

        let seatClass =
          "seat-btn btn";

        if (seat.daDat) {
          seatClass +=
            " btn-secondary seat-reserved";
        } else if (isSelected) {
          seatClass +=
            " btn-warning seat-selected";
        } else if (seat.loaiGhe?.toLowerCase() === "vip") {
          seatClass +=
            " btn-primary seat-vip";
        } else {
          seatClass +=
            " btn-danger seat-available";
        }

        return (
          <button
            key={seat.maGhe}
            disabled={seat.daDat}
            onClick={() =>
              dispatch(toggleSeat(seat))
            }
            className={seatClass}
          >
            {seat.daDat ? (
              <i className="fa-solid fa-xmark"></i>
            ) : (
                seat.tenGhe
            )}
          </button>
        );
      })}

    </div>
  );
}