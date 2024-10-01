import Slider from "react-slick";
import "./style/hero-carousel.css";
import { motion, useAnimation } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Define CSS classes for dots positions
const dotsPositionClasses = {
  "bottom-center": "bottom-2 left-1/2 transform -translate-x-1/2",
  "top-center": "top-2 left-1/2 transform -translate-x-1/2",
  "left-center": "left-2 top-1/2 transform -translate-y-1/2",
  "right-center": "right-2 top-1/2 transform -translate-y-1/2",
  "bottom-left": "bottom-2 left-2",
  "bottom-right": "bottom-2 right-2",
  "top-left": "top-2 left-2",
  "top-right": "top-2 right-2",
};

const HeroCarousel = ({ children, childrenLength, sliderTimer = 3300, dotsPosition = "bottom-center" }) => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => prevProgress + (100 / sliderTimer) * 100);
    }, 100);

    if (progress >= 100) clearInterval(interval);

    return () => clearInterval(interval);
  }, [sliderIndex, progress, sliderTimer]);

  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: sliderTimer,
    pauseOnHover: false,
    beforeChange: () => setProgress(0),
    afterChange: (current) => setSliderIndex(current),
  };

  return (
    <div className="relative w-full overflow-hidden">
      <Slider {...settings} className="w-full border m-0">
        {children}
      </Slider>

      <div className={`absolute overflow-hidden flex gap-x-1 ${dotsPositionClasses[dotsPosition]}`}>
        {Array.from({ length: childrenLength }).map((_, index) => (
          <div key={index} className="cursor-pointer bg-[#ffffff67] rounded-full w-fit h-fit">
            {index === sliderIndex ? <ProgressBar percent={progress} /> : <span className="w-1.5 h-1.5 block rounded-full" />}
          </div>
        ))}
      </div>
    </div>
  );
};

const ProgressBar = ({ percent }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ width: `${percent}%` });
  }, [percent, controls]);

  return (
    <motion.div className="relative w-[40px] h-1.5 bg-[#ffffff67] rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-white rounded-full"
        initial={{ width: "0%" }}
        animate={controls}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};

ProgressBar.propTypes = {
  percent: PropTypes.number.isRequired,
};

HeroCarousel.propTypes = {
  children: PropTypes.node.isRequired,
  childrenLength: PropTypes.number.isRequired,
  sliderTimer: PropTypes.number,
  dotsPosition: PropTypes.oneOf(Object.keys(dotsPositionClasses)),
};

export default HeroCarousel;
