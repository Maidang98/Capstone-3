import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchListMovieAdmin } from "../Films/slice";

export default function Dashboard() {
const dispatch = useDispatch();

const { listMovie } = useSelector(
(state) => state.filmsReducer
);

useEffect(() => {
dispatch(fetchListMovieAdmin());
}, [dispatch]);

const totalMovies = listMovie?.length || 0;

const nowShowing =
listMovie?.filter((movie) => movie.dangChieu).length || 0;

const comingSoon =
listMovie?.filter((movie) => movie.sapChieu).length || 0;

const cinemaLocations = 8;

const cards = [
{
title: "Total Movies",
value: totalMovies,
icon: "fa-film",
color: "primary",
badge: "MOVIES",
},
{
title: "Now Showing",
value: nowShowing,
icon: "fa-play",
color: "success",
badge: "LIVE",
},
{
title: "Coming Soon",
value: comingSoon,
icon: "fa-clock",
color: "warning",
badge: "UPCOMING",
},
{
title: "Cinema Locations",
value: cinemaLocations,
icon: "fa-building",
color: "info",
badge: "CINEMA",
},
];

return ( <div className="container-fluid">

  {/* Page Header */}
  <div className="mb-4">

    <h1 className="h2 fw-bold text-light mb-2">
      Dashboard Overview
    </h1>

    <p className="text-secondary mb-0">
      Monitor key statistics and system performance in real time.
    </p>

  </div>

  {/* Statistics Cards */}
  <div className="row g-4 mb-4">

    {cards.map((card, index) => (
      <div
        key={index}
        className="col-12 col-sm-6 col-xl-3"
      >
        <div className="card bg-dark border-secondary h-100 shadow-sm">

          <div className="card-body">

            <div className="d-flex justify-content-between align-items-start mb-3">

              <div
                className={`bg-${card.color} bg-opacity-10 rounded p-3`}
              >
                <i
                  className={`fa-solid ${card.icon} text-${card.color} fs-4`}
                ></i>
              </div>

              <span
                className={`badge bg-${card.color}`}
              >
                {card.badge}
              </span>

            </div>

            <h6 className="text-secondary mb-2">
              {card.title}
            </h6>

            <h2 className="fw-bold text-light mb-0">
              {card.value}
            </h2>

          </div>

        </div>
      </div>
    ))}

  </div>

  {/* Analytics Section */}
  <div className="card bg-dark border-secondary shadow-sm">

    <div className="card-header bg-black border-secondary">

      <h5 className="mb-0 text-light">
        Revenue Analytics
      </h5>

    </div>

    <div
      className="card-body d-flex justify-content-center align-items-center"
      style={{ minHeight: "250px" }}
    >

      <div className="text-center">

        <i className="fa-solid fa-chart-column text-secondary fs-1 mb-3"></i>

        <h6 className="text-light">
          Analytics Coming Soon
        </h6>

        <p className="text-secondary mb-0">
          Detailed revenue reports and performance metrics
          will be available in a future update.
        </p>

      </div>

    </div>

  </div>

</div>

);
}
