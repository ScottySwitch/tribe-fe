import Icon from "components/Icon/Icon";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import styles from "./ListingInfoCardInReview.module.scss";

const ReviewBizInfoCard = (props) => {
  const {
    title,
    rate,
    rateNumber,
    followerNumber,
    imgUrl,
    tags,
    location,
    slug,
  } = props;
  const router = useRouter();

  const handleDirectToHomepage = () => router.push(`/biz/home/${slug}`);

  return (
    <div className={styles.biz_info}>
      <div className={styles.avatar} onClick={handleDirectToHomepage}>
        <Image
          src={imgUrl || "https://picsum.photos/48"}
          height="100%"
          width="100%"
          layout="responsive"
          alt=""
        />
      </div>
      <div className={styles.summary}>
        {title && (
          <h6 className={styles.title} onClick={handleDirectToHomepage}>
            {title}
          </h6>
        )}
        <div className={styles.group}>
          <Icon icon="red-star" size={12} className="mr-2" />
          <span className={styles.rate}>{rate}</span>
          <span className="ml-1">({rateNumber})</span>
          {followerNumber && (
            <React.Fragment>
              <Icon icon="dot" size={10} color="#C6C8D2" className="mx-2" />
              <div>{followerNumber} followers</div>
            </React.Fragment>
          )}
        </div>
        {location && (
          <div className={styles.group}>
            <Icon icon="map" size={12} className="mr-2" />
            <div>{location}</div>
          </div>
        )}
        {tags && (
          <div className={styles.group}>
            {tags?.map((tag) => (
              <div key={tag} className={styles.tag}>
                <span>{tag}</span>
                <span className="mx-2.5">|</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewBizInfoCard;
