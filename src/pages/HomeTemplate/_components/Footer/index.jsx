import React from "react";


export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black text-light border-top border-dark position-relative">

      <div className="container py-5">

        <div className="row g-4">

          {/* Logo */}
          <div className="col-lg-5">

            <h2 className="fw-bold text-uppercase">
              UY <span className="text-danger">Cinema</span>
            </h2>

            <div className="bg-danger my-3" style={{ width: 70, height: 4 }} />

            <p className="text-secondary">
              The modern, fast and secure online movie ticket booking system.
            </p>

            <div className="d-flex gap-3">

              <a className="btn btn-outline-light btn-sm rounded-circle" href="#">
                <i className="fab fa-facebook-f"></i>
              </a>

              <a className="btn btn-outline-light btn-sm rounded-circle" href="#">
                <i className="fab fa-instagram"></i>
              </a>

              <a className="btn btn-outline-light btn-sm rounded-circle" href="#">
                <i className="fab fa-youtube"></i>
              </a>

              <a className="btn btn-outline-light btn-sm rounded-circle" href="#">
                <i className="fab fa-tiktok"></i>
              </a>

            </div>

          </div>

          {/* About */}
          <div className="col-md-6 col-lg-2">
            <h5 className="fw-bold text-uppercase">About</h5>
            <ul className="list-unstyled text-secondary">
              <li className="footer-link">About Us</li>
              <li className="footer-link">News</li>
              <li className="footer-link">Careers</li>
              <li className="footer-link">Contact</li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-md-6 col-lg-2">
            <h5 className="fw-bold text-uppercase">Support</h5>
            <ul className="list-unstyled text-secondary">
              <li className="footer-link">FAQ</li>
              <li className="footer-link">Payment</li>
              <li className="footer-link">Help Center</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-3">
            <h5 className="fw-bold text-uppercase">Contact</h5>

            <p className="text-secondary mb-1">Hotline</p>

            <h4 className="text-danger fw-bold">1349</h4>

            <p className="text-secondary">8:00 - 22:00</p>
            <p className="text-secondary">support@uycinema.com</p>
          </div>

        </div>

        <hr className="border-secondary my-4" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">

          <p className="text-secondary mb-0">
            © 2026 <span className="text-danger fw-bold">UY Cinema</span>
          </p>

          <div className="d-flex gap-3 fs-4">
            <i className="fab fa-cc-visa"></i>
            <i className="fab fa-cc-mastercard"></i>
            <i className="fab fa-cc-apple-pay"></i>
          </div>

        </div>

      </div>


      <div
  className="position-absolute d-flex flex-column gap-2"
  style={{
    right: 28,
    bottom: 100,
  }}
>

<a href="#" className="social-icon facebook">
  <i className="fab fa-facebook-f"></i>
</a>

<a href="#" className="social-icon instagram">
  <i className="fab fa-instagram"></i>
</a>

<a href="#" className="social-icon youtube">
  <i className="fab fa-youtube"></i>
</a>

<a href="#" className="social-icon twitter">
  <i className="fa-brands fa-x-twitter"></i>
</a>

  <a href="#" className="social-icon">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
      alt="Zalo"
      style={{ width: 22 }}
    />
  </a>

</div> 
      {/* Back to top */}
      <button
        onClick={scrollToTop}
        className="btn btn-danger rounded-circle position-absolute"
        style={{
          width: 60,
          height: 60,
          right: 20,
          bottom: 20,
        }}
      >
        ↑
      </button>

    </footer>
  );
}