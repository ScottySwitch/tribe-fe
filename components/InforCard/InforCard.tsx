import Icon from "components/Icon/Icon";
import Image from "next/image";
import styles from "./InforCard.module.scss";

export interface InforCardProps {
  imgUrl: string;
  title?: string;
  rate?: number;
  categories?: string[];
  tags?: string[];
  price?: string | number;
  isVerified?: boolean;
  rateNumber?: number;
  followerNumber?: number;
}

const InforCard = (props: InforCardProps) => {
  const {
    imgUrl,
    title,
    rate,
    rateNumber,
    followerNumber,
    categories,
    tags,
    price,
    isVerified,
  } = props;
  return (
    <div className={styles.infor_card}>
      {isVerified && (
        <div className={styles.verified}>
          <Icon icon="verified-tag" style={{ height: "30px", width: "70px" }} />
        </div>
      )}
      <div className={styles.cover}>
        <Image
          src={imgUrl}
          alt=""
          layout="responsive"
          width="100%"
          height="100%"
        />
      </div>
      <div className={styles.details}>
        <div className={styles.title}>{title}</div>
        <div className={styles.reviews}>
          <Icon icon="red-star" size={14} />
          <div className={styles.rate}>{rate}</div>
          <div>({rateNumber})</div>
          <Icon icon="dot" size={10} className={styles.dot} />
          <div>{followerNumber} followers</div>
        </div>
        <div className={styles.categories}>
          {categories?.map((cate) => (
            <div key={cate} className={styles.category}>
              {cate}
            </div>
          ))}
        </div>
        <div className={styles.break} />
        <div className={styles.price}>
          From <span>{price}</span>
        </div>
        <div className={styles.tags}>
          {tags?.map((tag) => (
            <div key={tag} className={styles.tag}>
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InforCard;
