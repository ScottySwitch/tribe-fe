import Break from "components/Break/Break"
import Icon from "components/Icon/Icon"
import Image from "next/image"
import styles from "./InforCard.module.scss"

export interface InforCardProps {
  imgUrl: string
  title?: string
  rate?: number
  categories?: string[]
  tags?: string[]
  price?: string | number
  isVerified?: boolean
  rateNumber?: number
  followerNumber?: number
  description?: string
  width?: string | number
}

const InforCard = (props: InforCardProps) => {
  const {
    imgUrl,
    title,
    rate,
    description,
    rateNumber,
    followerNumber,
    categories,
    tags,
    price,
    isVerified,
    width,
  } = props
  return (
    <div className={styles.infor_card} style={{ width }}>
      {isVerified && (
        <div className={styles.verified}>
          <Icon icon="verified-tag" className={styles.verified_icon} />
        </div>
      )}
      <div className={styles.cover}>
        {imgUrl && <Image src={imgUrl} alt="" layout="responsive" width="100%" height="100%" />}
      </div>
      <div className={styles.details}>
        <div className={styles.title}>{title}</div>
        {rate && (
          <div className={styles.reviews}>
            <Icon icon="red-star" size={14} />
            <div className={styles.rate}>{rate}</div>
            <div>({rateNumber})</div>
            <Icon icon="dot" size={10} className={styles.dot} />
            <div>{followerNumber} followers</div>
          </div>
        )}
        {description && <div className={styles.description}>{description}</div>}
        {Array.isArray(categories) && (
          <div className={styles.categories}>
            {categories.map((cate) => (
              <div key={cate} className={styles.category}>
                {cate}
              </div>
            ))}
          </div>
        )}
        {(price || tags) && <Break />}
        {price && (
          <div className={styles.price}>
            From <span>{price}</span>
          </div>
        )}
        {Array.isArray(tags) && (
          <div className={styles.tags}>
            {tags.map((tag) => (
              <div key={tag} className={styles.tag}>
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default InforCard
