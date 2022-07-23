import Album from "components/Album/Album";
import Icon from "components/Icon/Icon";
import Modal from "components/Modal/Modal";
import Upload from "components/Upload/Upload";
import { get } from "lodash";
import React, { useState } from "react";
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
      <Modal
        visible={showAlbumModal}
        title=" "
        width="90%"
        // maxHeight="90%"
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
