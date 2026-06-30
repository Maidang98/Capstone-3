import React, { useState, useEffect } from "react";
import moment from "moment";

export default function ShowtimeSchedule({
  lichChieu,
  handleBooking,
}) {
  const [selectedDate, setSelectedDate] = useState(null);

  const groupLichChieuByDate = (data) => {
    if (!data) return {};

    return data.reduce((groups, item) => {
      const date = moment(item.ngayChieuGioChieu).format(
        "DD/MM/YYYY"
      );

      if (!groups[date]) {
        groups[date] = [];
      }

      groups[date].push(item);

      return groups;
    }, {});
  };

  const groupedData = groupLichChieuByDate(lichChieu);
  const dates = Object.keys(groupedData);

  useEffect(() => {
    if (dates.length > 0 && !selectedDate) {
      setSelectedDate(dates[0]);
    }
  }, [dates, selectedDate]);

  if (!lichChieu || lichChieu.length === 0) {
    return (
      <div className="alert alert-dark border-secondary text-secondary">
        No showtimes are currently available for this movie.
      </div>
    );
  }

  return (
    <div className="mt-4">

      {/* HEADER */}

      <div className="d-flex align-items-center mb-4">
        <i className="fa-solid fa-calendar-days text-danger me-2"></i>

        <h5 className="text-white fw-bold mb-0">
          Select Showtime Date
        </h5>
      </div>

      {/* DATE SELECTOR */}

      <div
        className="d-flex gap-3 overflow-auto pb-3"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {dates.map((date) => {
          const isSelected =
            selectedDate === date;

          return (
            <button
              key={date}
              onClick={() =>
                setSelectedDate(date)
              }
              className={`btn flex-shrink-0 px-3 py-3 ${
                isSelected
                  ? "btn-danger"
                  : "btn-dark border-secondary"
              }`}
              style={{
                minWidth: "95px",
                borderRadius: "16px",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  textTransform: "uppercase",
                  opacity: 0.8,
                }}
              >
                {moment(
                  date,
                  "DD/MM/YYYY"
                ).format("ddd")}
              </div>

              <div
                className="fw-bold"
                style={{
                  fontSize: "16px",
                }}
              >
                {moment(
                  date,
                  "DD/MM/YYYY"
                ).format("DD/MM")}
              </div>
            </button>
          );
        })}
      </div>

      {/* SHOWTIME TITLE */}

      <div className="mt-4 mb-3">
        <h6 className="text-light fw-bold">
          Available Showtimes
        </h6>
      </div>

      {/* SHOWTIMES */}

      <div className="row g-3">

        {groupedData[selectedDate]?.map(
          ({
            maLichChieu,
            ngayChieuGioChieu,
          }) => (
            <div
              key={maLichChieu}
              className="col-4 col-sm-3 col-md-2"
            >
              <button
                onClick={() =>
                  handleBooking?.(
                    maLichChieu
                  )
                }
                className="btn btn-dark border-secondary w-100 py-2 fw-bold"
                style={{
                  borderRadius: "12px",
                  transition:
                    "all .3s ease",
                }}
              >
                {moment(
                  ngayChieuGioChieu
                ).format("HH:mm")}
              </button>
            </div>
          )
        )}

      </div>

      {/* FOOTER INFO */}

      <div className="mt-4 text-secondary small">
        <i className="fa-solid fa-circle-info me-2"></i>
        Select a preferred showtime to
        continue with seat selection and
        ticket booking.
      </div>

    </div>
  );
}
