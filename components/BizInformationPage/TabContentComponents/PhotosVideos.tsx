import Break from "components/Break/Break";
import Button from "components/Button/Button";
import InforCard from "components/InforCard/InforCard";
import SectionLayout from "components/SectionLayout/SectionLayout";
import Upload from "components/Upload/Upload";
import { bizInformationDefaultFormData } from "constant";
import _, { isArray } from "lodash";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import bizListingRevision from "services/biz-listing-revision";
import { Ilisting } from "type";
import styles from "./TabContent.module.scss";

interface PhotosVideosProps {
  isPaid: boolean;
  revisionId?: number;
  listing?: Ilisting;
}

const PhotosVideos = (props: PhotosVideosProps) => {
  const { isPaid, revisionId, listing } = props;
  const preMedia = useRef(listing?.images);
  const [images, setImages] = useState(
    isArray(listing?.images) ? listing?.images : []
  );

  const isSameMedia = !_.isEqual(images, preMedia.current);

  const updateListingImages = async () => {
    const updateMedia = revisionId
      ? bizListingRevision.updateBizListingRevision(revisionId, {
          images: images,
        })
      : bizListingRevision.createBizListingRevision({
          slug: listing?.slug,
          images: images,
        });

    updateMedia
      .then((res) => {
        toast.success("Update successfully!", { autoClose: 2000 });
        preMedia.current = images;
      })
      .catch((error) => toast.error("Update failed"));
  };

  return (
    <SectionLayout
      title="Photos/videos"
      className={styles.photos_videos}
      containerClassName="w-full"
    >
      <div className={styles.tips_button}>
        <div className={styles.tips}>
          <strong>Tips:</strong> Click the pin icon to put 5 images on the top.
        </div>
        <Button
          text="Save change"
          width={200}
          disabled={!isSameMedia}
          onClick={updateListingImages}
        />
      </div>
      <Break />
      <div className={styles.product_container}>
        <Upload
          multiple
          type="media"
          fileList={images}
          onChange={(imageList) => setImages(imageList)}
          isPaid={isPaid}
        />
      </div>
      <Break />
    </SectionLayout>
  );
};

export default PhotosVideos;
