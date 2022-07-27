import Album from "components/Album/Album";
import Carousel from "components/Carousel/Carousel";
import Icon from "components/Icon/Icon";
import Modal from "components/Modal/Modal";
import Upload from "components/Upload/Upload";
import { homeBannerResponsive } from "constant";
import { get } from "lodash";
import Image from "next/image";
import React, { useState } from "react";
import { detectIsVideo, isArray } from "utils";
import styles from "./Banner.module.scss";
interface BannerProps {
  isViewPage?: boolean;
  isPaid?: boolean;
  listingImages: string[];
  listingId?: string | number;
  onChangeImages: (images: string[]) => void;
}

const CenterIcon = () => (
  <div className="flex flex-col items-center gap-1">
    <Icon icon="camera-color" size={40} />
    <p>Add photos/ videos</p>
  </div>
);

const Banner = (props: BannerProps) => {
  const { isPaid, isViewPage, listingImages, listingId, onChangeImages } =
    props;
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  return (
    <React.Fragment>
      <Upload
        className={styles.banner}
        centerIcon={<CenterIcon />}
        onChange={onChangeImages}
        type="banner"
        isPaid={isPaid}
        fileList={listingImages}
        disabled={isViewPage}
        isViewPage={isViewPage}
        multiple
        onImageClick={() => {
          setShowAlbumModal(true);
        }}
      />
      <Carousel
        responsive={{
          xsShow: 1,
          xsScroll: 1,
          smShow: 1,
          smScroll: 1,
          mdShow: 1,
          mdScroll: 1,
        }}
        key={get(listingImages, "length")}
        isShow={isArray(listingImages)}
        className={styles.mobile_banner_card}
      >
        {isArray(listingImages) &&
          listingImages.map((img, index) => {
            return detectIsVideo(img) ? (
              <video
                key={index}
                id="video"
                src={img}
                className={styles.mobile_banner_card}
                onClick={() => setShowAlbumModal(true)}
              />
            ) : (
              <div
                key={index}
                className={styles.mobile_banner_card}
                onClick={() => setShowAlbumModal(true)}
              >
                <Image alt="" layout="fill" src={img} objectFit="cover" />
              </div>
            );
          })}
      </Carousel>
      <Modal
        visible={showAlbumModal}
        title=" "
        width="90%"
        maxHeight="800px"
        mobilePosition="center"
        contentClassName="pb-3"
        onClose={() => setShowAlbumModal(false)}
      >
        <Album
          id="banner-album"
          key={get(listingImages, "length")}
          images={listingImages}
          listingId={listingId}
        />
      </Modal>
    </React.Fragment>
  );
};

export default Banner;
