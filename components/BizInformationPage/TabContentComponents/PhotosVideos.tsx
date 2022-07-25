import Break from "components/Break/Break";
import Button from "components/Button/Button";
import InforCard from "components/InforCard/InforCard";
import Loader from "components/Loader/Loader";
import SectionLayout from "components/SectionLayout/SectionLayout";
import Upload from "components/Upload/Upload";
import { bizInformationDefaultFormData } from "constant";
import useCheckRevision from "hooks/useCheckRevision";
import _, { get, isArray } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import bizListingApi from "services/biz-listing";
import bizListingRevision from "services/biz-listing-revision";
import { Ilisting } from "type";
import styles from "./TabContent.module.scss";

const PhotosVideos = () => {
  const [loading, setLoading] = useState(true);
  const [isPaid, setIsPaid] = useState(true);
  const [listing, setListing] = useState<any>({});
  const [images, setImages] = useState(
    isArray(listing.images) ? listing.images : []
  );

  const { query } = useRouter();
  const { listingSlug }: any = query;

  const preMedia = useRef(listing.images);
  const isSameMedia = !_.isEqual(images, preMedia.current);
  const { isRevision, revisionId } = useCheckRevision(loading, listingSlug);

  useEffect(() => {
    const getListingData = async () => {
      const data = await bizListingApi.getInfoBizListingBySlug(listingSlug);
      const listing = get(data, "data.data[0]") || {};
      const isPaidListing = get(listing, "biz_invoices.length") > 0;

      setIsPaid(isPaidListing);
      setListing(listing);
      setLoading(false);
    };

    listingSlug && loading && getListingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listingSlug, loading]);

  const updateListingImages = async () => {
    const updateMedia =
      isRevision && revisionId
        ? bizListingRevision.updateBizListingRevision(revisionId, {
            images: images,
          })
        : bizListingRevision.createBizListingRevision({
            slug: listing.slug,
            images: images,
          });

    updateMedia
      .then((res) => {
        toast.success("Update successfully!", { autoClose: 2000 });
        preMedia.current = images;
        setLoading(true);
      })
      .catch((error) => toast.error("Update failed"));
  };

  if (loading) {
    return <Loader />;
  }

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
