import Icon from "components/Icon/Icon";
import InforCard from "components/InforCard/InforCard";
import React, { ReactElement, useRef } from "react";
import Slider from "react-slick";

import styles from "./Carousel.module.scss";

interface CarouselProps {
  children?: ReactElement | ReactElement[];
}

const Carousel = (props: CarouselProps) => {
  const { children } = props;

  const horizontalSliderRef = useRef<any>(null);

  const horizontalSliderSettings = {
    className: styles.slick_slide,
    dots: true,
    arrows: false,
    centerPadding: "20px",
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    adaptiveHeight: true,
    center: true,
    cssEase: "linear",

    responsive: [
      {
        breakpoint: 1450,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function handlePrevHorizontalSlide() {
    if (horizontalSliderRef && horizontalSliderRef.current) {
      horizontalSliderRef.current.slickPrev();
    }
  }

  function handleNextHorizontalSlide() {
    if (horizontalSliderRef && horizontalSliderRef.current) {
      horizontalSliderRef.current.slickNext();
    }
  }

  return (
    <div className={styles.carousel}>
      <div onClick={handlePrevHorizontalSlide} className={styles.btn_prev}>
        <Icon icon="carret-left" size={20} />
      </div>
      <Slider ref={horizontalSliderRef} {...horizontalSliderSettings}>
        {children}
      </Slider>
      <div onClick={handleNextHorizontalSlide} className={styles.btn_next}>
        <Icon icon="carret-right" size={20} />
      </div>
    </div>
  );
};

export default Carousel;
