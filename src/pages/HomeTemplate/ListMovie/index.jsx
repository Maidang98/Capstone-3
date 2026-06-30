import { useEffect, useState } from "react";
import api from "../../../services/api";
import Movie from "../_components/movie";
import LoadingSkeleton from "./../_components/loading";

export default function ListMovie() {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);

  // scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // fetch movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        const [res1, res2] = await Promise.all([
          api.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP01"),
          api.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP05"),
        ]);

        const combined = [...res1.data.content, ...res2.data.content];

        const uniqueMovies = combined.filter(
          (movie, index, self) =>
            index === self.findIndex((m) => m.maPhim === movie.maPhim)
        );

        setMovies(uniqueMovies);
      } catch (error) {
        console.error("Failed to load movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) => {
    const isNowShowing = movie.dangChieu === true;

    const matchesSearch = movie.tenPhim
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return isNowShowing && matchesSearch;
  });

  return (
    <div className="bg-dark min-vh-100 pt-5 pb-5 position-relative">

      <div className="container">

        {/* HEADER */}
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-end mb-4 border-bottom border-secondary pb-4 gap-3">

          <div>
            <h1 className="text-white text-uppercase fw-black display-5">
              Now <span className="text-danger">Showing</span>
            </h1>

            <p className="text-secondary mt-2 mb-0">
              {loading ? "Loading..." : `Found ${filteredMovies.length} movies`}
            </p>
          </div>

          {/* SEARCH */}
          <div className="w-100" style={{ maxWidth: "450px" }}>
            <input
              type="text"
              placeholder="Search movies..."
              className="form-control bg-dark text-white border-secondary py-2 px-3"
              style={{ borderRadius: "12px" }}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ minHeight: "400px" }}>

          {loading ? (
            <div className="row g-3">
              {Array(8).fill(0).map((_, i) => (
                <div key={i} className="col-6 col-lg-3">
                  <LoadingSkeleton />
                </div>
              ))}
            </div>
          ) : filteredMovies.length > 0 ? (
            <div className="row g-3 animate__animated animate__fadeIn">
              {filteredMovies.map((movie) => (
                <div key={movie.maPhim} className="col-6 col-lg-3">
                  <Movie movie={movie} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-secondary py-5">
              No movies found
            </div>
          )}

        </div>
      </div>

      {/* BACK TO TOP */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`btn btn-danger rounded-circle position-fixed d-flex align-items-center justify-content-center`}
        style={{
          width: "48px",
          height: "48px",
          bottom: "24px",
          right: "24px",
          transition: "all 0.3s",
          opacity: showBackToTop ? 1 : 0,
          pointerEvents: showBackToTop ? "auto" : "none",
          transform: showBackToTop ? "translateY(0)" : "translateY(20px)",
        }}
      >
        ↑
      </button>

    </div>
  );
}