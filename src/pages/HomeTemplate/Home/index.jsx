import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBanners, fetchData } from "./slice";
import Movie from "../_components/movie";
import HomeCarousel from "../_components/HomeCarousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlickSlider from "react-slick";

const Slider = SlickSlider.default || SlickSlider;

/* SLIDER SETTINGS */
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1 } },
  ],
};

export default function Home() {
  const dispatch = useDispatch();
  const { loading, data = [] } = useSelector((state) => state.homeReducer);

  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchBanners());
    window.scrollTo(0, 0);
  }, [dispatch]);

  const grouped = (data || []).reduce(
    (acc, movie) => {
      if (movie?.dangChieu) acc.nowShowing.push(movie);
      if (movie?.sapChieu) acc.comingSoon.push(movie);
      if (movie?.hot) acc.hot.push(movie);
      return acc;
    },
    { nowShowing: [], comingSoon: [], hot: [] }
  );

  if (loading) {
    return (
      <div className="bg-black d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-danger" role="status" style={{ width: 60, height: 60 }} />
      </div>
    );
  }

  return (
    <div className="bg-black text-light min-vh-100">
      <HomeCarousel />
      <div className="container py-5">
        <Section title="Now Showing" color="danger">
          {grouped.nowShowing.length > 0 && (
            <Slider {...sliderSettings}>
              {grouped.nowShowing.map((movie) => (
                <div key={movie.maPhim} className="h-100 px-2">
                  <Movie movie={movie} />
                </div>
              ))}
            </Slider>
          )}
        </Section>

        <Section title="Trending Movies" color="warning">
          {grouped.hot.length > 0 && (
            <Slider {...sliderSettings}>
              {grouped.hot.map((movie) => (
                <div key={movie.maPhim} className="h-100 px-2">
                  <Movie movie={movie} />
                </div>
              ))}
            </Slider>
          )}
        </Section>

        <Section title="Coming Soon" color="secondary">
          {grouped.comingSoon.length > 0 && (
            <Slider {...sliderSettings}>
              {grouped.comingSoon.map((movie) => (
                <div key={movie.maPhim} className="h-100 px-2">
                  <Movie movie={movie} />
                </div>
              ))}
            </Slider>
          )}
        </Section>
      </div>
    </div>
  );
}

function Section({ title, color = "danger", children }) {
  return (
    <div className="mb-5">
      <h2 className={`text-uppercase fw-bold border-start border-4 border-${color} ps-3 mb-4`}>
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
}
