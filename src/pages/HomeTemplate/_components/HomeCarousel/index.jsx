import React, { useEffect, useState } from "react";
import { Carousel, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchBanners } from "../../Home/slice";
import Loading from "../../../../components/Loading";
import CountUp from "react-countup";

export default function HomeCarousel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openTrailer, setOpenTrailer] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const { banners = [], loading } = useSelector(
    (state) => state.homeReducer
  );

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  const handleTrailer = (movie) => {
    setSelectedMovie(movie);
    setOpenTrailer(true);
  };

  return (
    <>
      <section className="hero-section position-relative overflow-hidden">
        <Carousel autoplay effect="fade" speed={1000}>
          {banners.map((banner) => (
            <div key={banner.maBanner}>
              <div
                className="hero-slide"
                style={{
                  backgroundImage: `url(${banner.hinhAnh})`,
                }}
              >
                <div className="hero-overlay">
                  <div className="container">
                    <div className="hero-content glass-card">
                      <span className="badge bg-danger mb-3 px-3 py-2">
                        NOW SHOWING
                      </span>

                      <h1 className="hero-title">
                        {banner.tenPhim || "Premium Cinema Experience"}
                      </h1>

                      <div className="d-flex align-items-center gap-3 mb-3 flex-wrap">
                        <span className="rating-badge">
                          ⭐ {banner.danhGia || "9.0"}/10
                        </span>

                        <span className="badge bg-dark border border-secondary">
                          Featured Movie
                        </span>
                      </div>

                      <p className="hero-description">
                        {banner.moTa
                          ? banner.moTa.slice(0, 180) + "..."
                          : "Experience world-class storytelling, breathtaking visuals, and unforgettable cinematic moments."}
                      </p>

                      <div className="d-flex flex-wrap gap-3 mt-4">
                        <button
                          className="btn btn-danger btn-lg px-5"
                          onClick={() =>
                            navigate(`/detail/${banner.maPhim}`)
                          }
                        >
                          <i className="fa-solid fa-ticket me-2"></i>
                          Book Tickets
                        </button>

                        <button
                          className="btn btn-outline-light btn-lg px-5"
                          onClick={() => handleTrailer(banner)}
                        >
                          <i className="fa-solid fa-play me-2"></i>
                          Watch Trailer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>

        <div className="hero-bottom-gradient"></div>
      </section>

      {/* PROMOTION SECTION */}

      <section
        className="bg-dark py-5 position-relative text-white mt-5"
        style={{
          backgroundImage: "url(/images/popcornanddrink.avif)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.65)",
          }}
        />

        <div className="container position-relative">
          <div className="text-center mb-5">
            <h2 className="text-white fw-bold">
              🍿 Food & Drink Promotions
            </h2>

            <p className="text-light">
              Make your movie night even better.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="promo-card">
                <h4>🍿 Combo Saver</h4>
                <p>Large Popcorn + Large Drink</p>
                <span className="promo-discount">
                  Save 30%
                </span>
              </div>
            </div>

            <div className="col-md-4">
              <div className="promo-card">
                <h4>🎉 Weekend Special</h4>
                <p>Buy 2 Tickets & Get Free Popcorn</p>
                <span className="promo-discount">
                  Limited Time
                </span>
              </div>
            </div>

            <div className="col-md-4">
              <div className="promo-card">
                <h4>🥤 Family Pack</h4>
                <p>Popcorn + 4 Drinks</p>
                <span className="promo-discount">
                  Best Value
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}

      <section className="py-5 mt-5 position-relative text-white why-choose-us">
        <div className="container position-relative">
          <h2 className="text-center text-white fw-bold mb-5">
            WHY CHOOSE US
          </h2>

          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <h2 className="text-danger fw-bold">
                <CountUp.default end={50000} duration={2} />+
              </h2>
              <p className="text-light fs-5">
                Happy Customers
              </p>
            </div>

            <div className="col-md-4 mb-4">
              <h2 className="text-danger fw-bold">
                <CountUp.default end={200} duration={2} />
              </h2>
              <p className="text-light fs-5">
                Movies Available
              </p>
            </div>

            <div className="col-md-4 mb-4">
              <h2 className="text-danger fw-bold">
                <CountUp.default end={4000} duration={2} />+
              </h2>
              <p className="text-light fs-5">
                Ultra HD Experience
              </p>
            </div>
          </div>
        </div>
      </section>

      <Modal
        open={openTrailer}
        footer={null}
        onCancel={() => setOpenTrailer(false)}
        width={900}
      >
        <div className="p-3">
          <h3>{selectedMovie?.tenPhim}</h3>

          <p className="text-secondary">
            Trailer feature coming soon...
          </p>
        </div>
      </Modal>
    </>
  );
}