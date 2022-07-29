import Break from "components/Break/Break";
import Icon from "components/Icon/Icon";
import Image from "next/image";
import styles from "./InforCard.module.scss";
import { useState } from "react";
import { CurrencyValues } from "enums";

export interface InforCardProps {
  className?: string;
  imgUrl?: string;
  title?: string;
  author?: string;
  position?: string;
  rate?: number;
  categories?: string[];
  tags?: string[];
  iconTag?: boolean;
  price?: string | number;
  currency?: string;
  isVerified?: boolean;
  discount?: string | number;
  rateNumber?: number;
  followerNumber?: number;
  discount_unit?: string;
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
    imgUrl,
    title,
    rate,
    author,
    position,
    description,
    rateNumber,
    followerNumber,
    categories,
    tags,
    iconTag = false,
    discount_unit,
    discount,
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
        <Image
          src={src || require("public/images/default-avatar.svg")}
          alt=""
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div className={styles.details}>
        <div className={styles.title}>{title}</div>
        <div className={styles.content}>
          <div className="flex items-center">
            {!!rate && (
              <div className={styles.reviews}>
                <Icon icon="red-star" size={14} />
                <div className={styles.rate}>{rate}</div>
                <div>({rateNumber})</div>
              </div>
            )}
            {!!rate && followerNumber && (
              <Icon icon="dot" size={10} className={styles.dot} />
            )}
            {!!followerNumber && followerNumber > 0 && (
              <div>{followerNumber} followers</div>
            )}
          </div>
          {description && (
            <div className={styles.description}>{description}</div>
          )}
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
          <div className="flex gap-1 items-center">
            {price && (
              <div className={styles.price}>
                {price} {!!currency && currency.toUpperCase()}
              </div>
            )}
            {typeof discount === "number" &&
              typeof price === "number" &&
              discount_unit === CurrencyValues.PERCENTAGE && (
                <div className={styles.discount_amount}>
                  {(price * (discount / 100 + 1)).toFixed(2)} {currency}
                </div>
              )}
          </div>
          {discount && (
            <div className={styles.discount}>
              {discount} {!!discount_unit && discount_unit.toUpperCase()} OFF
            </div>
          )}
          {sortingTags.length > 0 && (
            <div className={styles.tags}>{renderSortingTags()}</div>
          )}
        </div>
        {author && <div className={styles.author}>{author}</div>}
        {position && <div className={styles.position}>{position}</div>}
      </div>
    </div>
  );
};

export default InforCard;
