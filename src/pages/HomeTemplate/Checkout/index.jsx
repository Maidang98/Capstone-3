import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoomDetail } from "./slice";
import moment from "moment";

import SeatMap from "./../_components/SeatMap";
import TicketInfo from "./../_components/TicketInfo";
import SeatLegend from "../_components/SeatLegend";
import Loading from "./../../../components/Loading";

export default function Checkout() {
  const { maLichChieu } = useParams();
  const dispatch = useDispatch();

  const roomDetail = useSelector(
    (state) => state.checkoutReducer.roomDetail
  );
  console.log("ROOM DETAIL FULL:", roomDetail);
  const info = roomDetail?.thongTinPhim;

  const { loading } = useSelector((state) => state.checkoutReducer);

  useEffect(() => {
    if (maLichChieu) {
      dispatch(fetchRoomDetail(maLichChieu));
    }
  }, [maLichChieu, dispatch]);

  if (loading) return <Loading />;

  return (
    <div className="bg-black text-white min-vh-100 pt-5 pb-4">

      {/* OPTIONAL: debug info */}
      <div className="container mb-3 text-secondary">
      <small>
        🎬 Movie: {info?.tenPhim} | 
        📍 Cinema: {info?.tenCumRap} | 
        ⏰ Time: {moment(info?.ngayChieuGioChieu).format("DD/MM/YYYY - HH:mm")}
      </small>
      </div>

      <div className="container">
        <div className="row g-4">

          {/* LEFT */}
          <div className="col-12 col-lg-8 text-center">

            <div className="position-relative mb-5 mt-3">
              <div
                className="mx-auto"
                style={{
                  width: "90%",
                  height: 6,
                  background:
                    "linear-gradient(90deg, transparent, #9ca3af, transparent)",
                  borderRadius: 10,
                  boxShadow: "0 15px 40px rgba(220,38,38,0.5)",
                }}
              />

              <p className="text-uppercase text-secondary fw-bold mt-4">
                SCREEN
              </p>
            </div>

            <div className="table-responsive mb-4">
              <div className="d-flex justify-content-center">
                <SeatMap />
              </div>
            </div>

            <div className="bg-dark border border-secondary rounded-4 p-4">
              <SeatLegend />
            </div>

          </div>

          {/* RIGHT */}
          <div className="col-12 col-lg-4">

            <div className="position-lg-sticky" style={{ top: 110 }}>

              <TicketInfo />

              <div className="mt-4 p-3 bg-dark border border-secondary rounded-3">
                <p className="text-secondary small mb-0">
                  Note: Tickets are non-refundable. Please double-check your seats before confirming.
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>

    </div>
  );
}