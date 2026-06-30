export const sliderSettings = {
  dots: true,
  infinite: true,

  speed: 800,

  slidesToShow: 5,
  slidesToScroll: 1,

  autoplay: true,
  autoplaySpeed: 4500,

  pauseOnHover: true,
  pauseOnFocus: true,

  swipeToSlide: true,
  touchThreshold: 10,

  lazyLoad: "ondemand",

  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 4,
      },
    },

    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
      },
    },

    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },

    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        centerMode: true,
        centerPadding: "40px",
      },
    },
  ],
};