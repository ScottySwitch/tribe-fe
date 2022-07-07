import Break from "components/Break/Break"
import Icon from "components/Icon/Icon"
import Image from "next/image"
import styles from "./InforCard.module.scss"

export interface InforCardProps {
  className?: string
  imgUrl: string
  title?: string
  rate?: number
  categories?: {[key: string]: any} []
  tags?: {[key: string]: any} []
  iconTag?: boolean
  price?: string | number
  isVerified?: boolean
  rateNumber?: number
  followerNumber?: number
  description?: string
  width?: string | number
  validUntil?: any
  isFavourited?: boolean
  onClick?: () => void
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
    onClick
  } = props
  // console.log('props', props)
  return (
    <div className={`${styles.infor_card} ${className}`} style={{ width }} onClick={onClick}>
      {isVerified && (
        <div className={styles.verified}>
          <Icon icon="verified-tag" className={styles.verified_icon} />
        </div>
      )}
      <div className={styles.cover}>
        {isFavourited && (
          <div className={styles.favourited}>
            <Icon icon="like-solid" color="#e60112" />
          </div>
        )}
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
        {description && <div className={styles.description}>
          {description}
          {/* {description.length > 50 ? description.substr(0, 50) : description} */}
        </div>}
        {Array.isArray(categories) && (
          <div className={styles.categories}>
            {categories.map((cate) => (
              <div key={cate.name} className={styles.category}>
                {cate.name}
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
              <div key={tag.label} className={`${styles.tag} flex items-center`}>
                { (iconTag && tag.label === "Hot deals") && <Icon icon="hot-deal" className="mr-2" /> }
                {tag.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default InforCard
