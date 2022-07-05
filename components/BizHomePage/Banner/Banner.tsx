import Icon from "components/Icon/Icon";
import Upload from "components/Upload/Upload";
import styles from "./Banner.module.scss";
interface BannerProps {
  isViewPage?: boolean;
  isPaid?: boolean;
  listingImages: string[];
  onChangeImages: (images: string[]) => void;
}

const CenterIcon = () => (
  <div className="flex flex-col items-center gap-1">
    <Icon icon="camera-color" size={40} />
    <p>Add photos/ videos</p>
  </div>
);

const Banner = (props: BannerProps) => {
  const { isPaid, isViewPage, listingImages, onChangeImages } = props;
  return (
    <Upload
      className={styles.banner}
      centerIcon={<CenterIcon />}
      onChange={onChangeImages}
      type="banner"
      isPaid={isPaid}
      fileList={listingImages}
      disabled={isViewPage}
    />
  );
};

export default Banner;
