import Icon from "components/Icon/Icon";
import { get } from "lodash";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Slider, { Settings } from "react-slick";

import styles from "./Album.module.scss";

interface AlbumProps {
  images?: any[];
  showedPicsNumber?: { slidesToShow: number; slidesToScroll: number };
}

export const Album = (props: AlbumProps) => {
  const {
    images = [],
    showedPicsNumber = { slidesToShow: 12, slidesToScroll: 12 },
  } = props;

  const [navThumbnail, setNavThumbnail] = useState<any>();
  const [navGallery, setNavGallery] = useState<any>();

  const refSlider1 = useRef<any>(null);
  const refSlider2 = useRef<any>(null);

  const handlePrevGallery = () => {
    if (refSlider2 && refSlider2.current) {
      refSlider2.current.slickPrev();
    }
  };
  const handleNextGallery = () => {
    if (refSlider2 && refSlider2.current) {
      refSlider2.current.slickNext();
    }
  };

  const handlePrevThumbnail = () => {
    if (refSlider1 && refSlider1.current) {
      refSlider1.current.slickPrev();
    }
  };
  const handleNextThumbnail = () => {
    if (refSlider1 && refSlider1.current) {
      refSlider1.current.slickNext();
    }
  };

  useEffect(() => {
    console.log("refSlider1", refSlider1.current);
    console.log("refSlider2", refSlider2.current);
    setNavThumbnail(images[0]);
    setNavGallery(images[0]);
    // setNavThumbnail(refSlider1.current);
    // setNavGallery(refSlider2.current);
  }, []);

  const configThumbnail: Settings = {
    dots: false,
    arrows: false,
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "linear",
    asNavFor: navGallery,
  };

  const configGallery: Settings = {
    className: styles.slider_gallery_item,
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: showedPicsNumber.slidesToShow,
    slidesToScroll: showedPicsNumber.slidesToScroll,
    cssEase: "linear",
    focusOnSelect: true,
    asNavFor: navThumbnail,
    adaptiveHeight: true,
  };

  return (
    <div className={styles.slider_syncing}>
      <div className={styles.slider_thumbnail_container}>
        <div onClick={handlePrevThumbnail} className={styles.btn_prev}>
          <Icon icon="carret-left" size={30} color="#FFFFFF" />
        </div>
        <Slider
          ref={refSlider1}
          {...configThumbnail}
          className={styles.slider_thumbnail}
        >
          {images?.map((image, index) => (
            <div key={index} className={styles.slider_thumbnail_item}>
              <Image
                src={image}
                layout="fill"
                alt={`thumbnail-${index}`}
                objectFit="contain"
              />
            </div>
          ))}
        </Slider>
        <div onClick={handleNextThumbnail} className={styles.btn_next}>
          <Icon icon="carret-right" size={30} color="#FFFFFF" />
        </div>
      </div>
      <div className={styles.slider_gallery_container}>
        {get(images, "length") > 12 && (
          <div onClick={handlePrevGallery} className={styles.btn_prev}>
            <Icon icon="carret-left" size={30} color="#FFFFFF" />
          </div>
        )}
        <Slider
          ref={refSlider2}
          {...configGallery}
          className={styles.slider_gallery}
        >
          {images?.map((image, index) => (
            <div key={index} className={styles.slider_gallery_item}>
              <Image
                src={image}
                layout="fill"
                alt={`gallery-${index}`}
                objectFit="cover"
              />
            </div>
          ))}
        </Slider>
        {get(images, "length") > 12 && (
          <div onClick={handleNextGallery} className={styles.btn_next}>
            <Icon icon="carret-right" size={30} color="#FFFFFF" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Album;
