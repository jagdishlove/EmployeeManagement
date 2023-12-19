import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const MobileSlider = () => {
  //For slider
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    beforeChange: (current, next) => setCurrentSlide(next),
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div>
      <Box
        sx={{
          display: {
            xs: "block",
            md: "none",
            borderTopRightRadius: "10px",
            borderTopLeftRadius: "10px",
            width: "100%",
            textAlign: "center",
            marginBottom: "35px",
          },
        }}
      >
        <Slider {...settings}>
          <div>
            <Typography
              variant="h3"
              className={currentSlide === 0 ? "fade-in-animation" : ""}
            >
              demonstrate utmost
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontWeight: "bold",
              }}
              className={currentSlide === 0 ? "fade-in-animation" : ""}
            >
              {" "}
              INTEGRITY
            </Typography>
          </div>
          <div>
            <Typography
              variant="h3"
              className={currentSlide === 1 ? "fade-in-animation" : ""}
            >
              keep
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontWeight: "bold",
              }}
              className={currentSlide === 1 ? "fade-in-animation" : ""}
            >
              Learning
            </Typography>
          </div>
          <div>
            <Typography
              variant="h3"
              className={currentSlide === 2 ? "fade-in-animation" : ""}
            >
              take new
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontWeight: "bold",
              }}
              className={currentSlide === 2 ? "fade-in-animation" : ""}
            >
              INITIATIVES
            </Typography>
          </div>
        </Slider>
      </Box>
    </div>
  );
};

export default MobileSlider;
