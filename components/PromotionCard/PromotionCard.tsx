import classNames from "classnames";
import Button from "components/Button/Button";
import Icon from "components/Icon/Icon";
import Image from "next/image";
import { PromotionType } from "./enums";
import styles from "./PromotionCard.module.scss";

export interface PromotionProps {
  imgUrl?: string;
  title: string;
  startDate: string;
  expiredAt: string;
  type?: string | number;
  favourite?: boolean;
  width?: string | number;
  size?: "medium" | "large";
  description?: string;
  onCardClick?: () => void;
  onClick?: () => void;
}

const PromotionCard = (props: PromotionProps) => {
  const {
    imgUrl,
    width,
    title,
    expiredAt,
    startDate,
    description,
    type,
    favourite,
    size = "medium",
    onCardClick,
    onClick,
  } = props;

  const buttonClasses = classNames({
    [styles.promotion_cta_primary]:
      PromotionType.VIEW_DETAIL === type || PromotionType.USE_NOW === type,
  });
  const avatarClassName = classNames(styles.promotion_avatar, {
    [styles.medium]: size === "medium",
    [styles.large]: size === "large",
  });

  const types = {
    [PromotionType.VIEW_DETAIL]: "View detail",
    [PromotionType.USE_NOW]: "Use now",
  };

  return (
    <div
      style={{ width }}
      className={styles.promotion_card}
      onClick={onCardClick}
    >
      <div className={avatarClassName}>
        {imgUrl && (
          <Image
            src={imgUrl}
            width="100%"
            height="100%"
            alt="promotion-alt"
            layout="responsive"
            className={styles.promotion_image}
          />
        )}
        {favourite && (
          <div className={styles.promotion_favourite}>
            <Icon icon="like-solid" color="#e60112" />
          </div>
        )}
      </div>
      <div className={styles.promotion_info}>
        <div>
          <h3 className={styles.promotion_title}>{title}</h3>
          <div className={styles.promotion_date}>
            {startDate} - {expiredAt}
          </div>
          <div className={styles.promotion_date}>{description}</div>
        </div>
        {type && (
          <Button
            className={buttonClasses}
            text={types[type]}
            onClick={onClick}
            width="max-content"
          />
        )}
      </div>
    </div>
  );
};

export default PromotionCard;
