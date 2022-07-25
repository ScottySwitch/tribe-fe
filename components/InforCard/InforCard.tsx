import Break from "components/Break/Break";
import Icon from "components/Icon/Icon";
import Image from "next/image";
import styles from "./InforCard.module.scss";
import { useState } from "react";

export interface InforCardProps {
  className?: string;
  imgUrl: string;
  title?: string;
  rate?: number;
  categories?: string[];
  tags?: string[];
  iconTag?: boolean;
  price?: string | number;
  currency?: string | number;
  isVerified?: boolean;
  rateNumber?: number;
  followerNumber?: number;
  description?: string;
  width?: string | number;
  validUntil?: any;
  isFavourited?: boolean;
  onFavouritedClick?: () => void;
  onClick?: () => void;
}

const InforCard = (props: InforCardProps) => {
  const {
    className,
    imgUrl = "https://picsum.photos/200/300",
    title,
    rate,
    description,
    rateNumber,
    followerNumber,
    categories,
    tags,
    iconTag = false,
    price,
    isVerified,
    width,
    isFavourited,
    currency,
    onFavouritedClick,
    onClick,
  } = props;

  const sortingTags: string[] = Array.isArray(tags)
    ? tags.sort((a, b) => {
        return a?.length - b?.length;
      })
    : [];

  const optimizeTagSequence = () => {
    let optimizeTags: any[] = [];
    for (let index = 0; index < Math.floor(sortingTags.length / 2); index++) {
      optimizeTags.push(sortingTags[index]);
      optimizeTags.push(sortingTags[sortingTags.length - index - 1]);
    }
    return optimizeTags;
  };

  const renderSortingTags = () => {
    return optimizeTagSequence().map((tag) => (
      <div key={tag} className={`${styles.tag} flex items-center`}>
        {iconTag && tag === "Hot deals" && (
          <Icon icon="hot-deal" className="mr-2" />
        )}
        {tag}
      </div>
    ));
  };

  const [src, setSrc] = useState(imgUrl);

  return (
    <div
      className={`${styles.infor_card} ${className}`}
      style={{ width }}
      onClick={onClick}
    >
      {isVerified && (
        <div className={styles.verified}>
          <Icon icon="verified-tag" className={styles.verified_icon} />
        </div>
      )}
      <div className={styles.cover}>
        {isFavourited && (
          <div className={styles.favourited} onClick={onFavouritedClick}>
            <Icon icon="like-solid" color="#e60112" />
          </div>
        )}
        {imgUrl && (
          <Image
            src={src}
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            onErrorCapture={() => {
              setSrc("https://picsum.photos/200/300");
            }}
          />
        )}
      </div>
      <div className={styles.details}>
        <div className={styles.title}>{title}</div>
        <div className={styles.content}>
          <div>
            {!!rate && (
              <div className={styles.reviews}>
                <Icon icon="red-star" size={14} />
                <div className={styles.rate}>{rate}</div>
                <div>({rateNumber})</div>
                <Icon icon="dot" size={10} className={styles.dot} />
              </div>
            )}
            {followerNumber && <div>{followerNumber} followers</div>}
            {description && (
              <div className={styles.description}>{description}</div>
            )}
          </div>
          <div>
            {Array.isArray(categories) && (
              <div className={styles.categories}>
                {categories.map((cate) => (
                  <div key={cate} className={styles.category}>
                    {cate}
                  </div>
                ))}
              </div>
            )}
            {(price || tags) && <div className={styles.break} />}
          </div>
        </div>
        <div className={styles.footer}>
          {price && (
            <div className={styles.price}>
              From <span>{price + " " + currency}</span>
            </div>
          )}
          {sortingTags.length > 0 && (
            <div className={styles.tags}>{renderSortingTags()}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InforCard;
